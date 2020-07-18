import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDOT {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    const total = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        income += currentValue.value;
        return accumulator + currentValue.value;
      }
      outcome += currentValue.value;
      return accumulator - currentValue.value;
    }, 0);

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDOT): Transaction {
    const { total } = this.getBalance();

    if (type === 'outcome') {
      if (total < value) {
        throw Error('Insufficient balance for this transaction');
      }
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
