import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionsRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError("There's no transaction with that ID", 404);
    }

    await transactionsRepository.delete(transaction.id);
  }
}

export default DeleteTransactionService;
