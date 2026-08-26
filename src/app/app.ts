import { Component } from '@angular/core';
import { CardsListComponent } from './cards-list/cards-list';
import { PaymentFormComponent } from './payment-form/payment-form';
import { TransactionsSearchComponent } from './transactions-search/transactions-search';

@Component({
  imports: [CardsListComponent, TransactionsSearchComponent, PaymentFormComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly title = 'Fintech App';
}
