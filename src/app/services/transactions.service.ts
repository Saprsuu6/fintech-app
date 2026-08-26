import { Injectable, signal, effect } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from '../models';

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    cardNumber: '4276 1234 5678 9012',
    amount: 15000,
    description: 'Оплата аренды офиса',
    date: '2024-03-15',
    type: 'debit',
  },
  {
    id: '2',
    cardNumber: '4276 1234 5678 9012',
    amount: 250000,
    description: 'Зачисление заработной платы',
    date: '2024-03-10',
    type: 'credit',
  },
  {
    id: '3',
    cardNumber: '5536 9876 5432 1098',
    amount: 4500,
    description: 'Оплата подписки на сервис',
    date: '2024-03-12',
    type: 'debit',
  },
  {
    id: '4',
    cardNumber: '5536 9876 5432 1098',
    amount: 32000,
    description: 'Перевод от контрагента',
    date: '2024-03-08',
    type: 'credit',
  },
  {
    id: '5',
    cardNumber: '4276 1234 5678 9012',
    amount: 8900,
    description: 'Оплата коммунальных услуг',
    date: '2024-03-05',
    type: 'debit',
  },
];

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly transactions = signal<Transaction[]>([]);
  public refresh$ = new BehaviorSubject<void>(undefined);

  constructor() {
    // 1. Восстанавливаем транзакции
    const savedTx = localStorage.getItem('fintech-transactions');
    if (savedTx) {
      this.transactions.set(JSON.parse(savedTx));
    } else {
      this.transactions.set(DEFAULT_TRANSACTIONS);
    }

    // 2. Авто-сохранение транзакций в localStorage
    effect(() => {
      localStorage.setItem('fintech-transactions', JSON.stringify(this.transactions()));
    });
  }

  searchTransactions(query: string): Observable<Transaction[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.transactions().filter(
      (t) =>
        t.description.toLowerCase().includes(lowerQuery) ||
        t.cardNumber.includes(query)
    );
    // Имитируем задержку ответа от "настоящего" сервера
    return of(filtered).pipe(delay(400));
  }

  addTransaction(transaction: Transaction): void {
    // Обновляем сигнал (effect сработает сам и запишет в localStorage)
    this.transactions.update((txs) => [transaction, ...txs]);
    
    // Дергаем триггер для RxJS пайпов, чтобы они знали об обновлении
    this.refresh$.next();
  }
}
