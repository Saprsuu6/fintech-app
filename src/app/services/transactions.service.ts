import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from '../models';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly mockTransactions: Transaction[] = [
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

  searchTransactions(query: string): Observable<Transaction[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.mockTransactions.filter(
      (t) => t.description.toLowerCase().includes(lowerQuery) || t.cardNumber.includes(query),
    );
    return of(filtered).pipe(delay(400));
  }
}
