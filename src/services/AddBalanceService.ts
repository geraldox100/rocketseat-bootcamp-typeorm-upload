import {getCustomRepository} from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'
interface Request{

    value:String;
    type:"income"|"outcome"

}

class AddBalanceService{

    public async execute({value,type}:Request): Promise<void>{
        // const transactioRepository= getCustomRepository(TransactionsRepository);
        // const balance = transactioRepository.getBalance();
        // if(type == "income"){
        //     balance.income += value;
        //     balance.total += value;
        // }else{
        //     if(value > balance.total){
        //         throw Error('dont have enough balance');
        //     }
        //     balance.outcome += value;
        //     balance.total -= value;
        // }
    }

}

export default AddBalanceService;