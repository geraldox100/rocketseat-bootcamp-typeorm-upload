import AppError from '../errors/AppError';
import {getCustomRepository,getRepository, Repository, getConnection} from 'typeorm'
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { request } from 'express';

interface Request{
  title: string; 
  value: number; 
  type: 'income' | 'outcome';
  category: string;  
}

class CreateTransactionService {

  private transactionRepository:TransactionsRepository;
  private categoryRepository:Repository<Category>;

  constructor(){
    this.transactionRepository = getConnection().getCustomRepository(TransactionsRepository);
    this.categoryRepository = getConnection().getRepository(Category);
  }

  public async execute({title, value, type,category}:Request): Promise<Transaction> {
    
    await this.ensureBalance(value,type);
    const savedCategory = await this.saveCategory(category);
    
    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
      category_id:savedCategory.id
    });
    
    await this.transactionRepository.save(transaction);
    
    return transaction;
  }

  private async ensureBalance(value:number,type:string) {
    const balance = await this.transactionRepository.getBalance();

    if(type==="outcome" && balance.total < value){
      throw new AppError('no balance available',400);
    }
  }

  private async saveCategory(categoryTitle:string):Promise<Category>{
    let savedCategory = await this.categoryRepository.findOne({
      where:{ title: categoryTitle }
    });

    if(!savedCategory){
      const category = this.categoryRepository.create({title:categoryTitle})
      savedCategory = await this.categoryRepository.save(category);
    }
    return savedCategory;
  }
}

export default CreateTransactionService;
