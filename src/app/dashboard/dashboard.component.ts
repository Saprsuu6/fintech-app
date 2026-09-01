import { Component } from '@angular/core';
import { CardsListComponent } from '../cards-list/cards-list';
import { PaymentFormComponent } from '../payment-form/payment-form';
import { TransactionsSearchComponent } from '../transactions-search/transactions-search';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.scss',
  imports: [CardsListComponent, TransactionsSearchComponent, PaymentFormComponent],
  template: `
    <section class="section">
      <h2>Мои карты</h2>
      <app-cards-list />
    </section>
    <section class="section">
      <h2>Поиск транзакций</h2>
      <app-transactions-search />
    </section>
    <section class="section">
      <h2>Новый платёж</h2>
      <app-payment-form />
    </section>
  `,
})
export class DashboardComponent {}
