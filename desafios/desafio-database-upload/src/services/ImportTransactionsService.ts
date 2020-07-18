import path from 'path';
import csvtojson from 'csvtojson';

import Transaction from '../models/Transaction';
import CreateTransactionsService from './CreateTransactionService';
import uploadConfig from '../config/upload';

interface Request {
  filename: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const transactionsFilePath = path.join(uploadConfig.directory, filename);

    const transactions = await csvtojson().fromFile(transactionsFilePath);

    const createTransactionsService = new CreateTransactionsService();

    const createdTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const { title, type, value, category } = transaction;

      const createdTransaction = await createTransactionsService.execute({
        title,
        type,
        value,
        category,
      });

      createdTransactions.push(createdTransaction);
    }

    return createdTransactions;
  }
}

export default ImportTransactionsService;
