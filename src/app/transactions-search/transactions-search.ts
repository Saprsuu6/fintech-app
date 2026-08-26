import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Transaction } from '../models';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions-search',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transactions-search.html',
  styleUrl: './transactions-search.scss',
})
export class TransactionsSearchComponent {
  private readonly transactionsService = inject(TransactionsService);

  readonly searchQuery = signal('');

  private readonly searchStream$ = toObservable(this.searchQuery).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.transactionsService.searchTransactions(query)),
  );

  readonly transactions = toSignal(this.searchStream$, {
    initialValue: [] as Transaction[],
  });

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
