import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance();
    if (type === 'outcome') {
      if (total < value) {
        throw new AppError('Insufficient balance for this transaction', 400);
      }
    }

    const categoryRepository = getRepository(Category);
    let categoryOnDB = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryOnDB) {
      categoryOnDB = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryOnDB);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryOnDB.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
