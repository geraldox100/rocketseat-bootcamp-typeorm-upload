// import AppError from '../errors/AppError';

import { getCustomRepository, ObjectID } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id:string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
