import { Component, computed, signal } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item';
import { BankCard } from '../models';

@Component({
  selector: 'app-cards-list',
  imports: [CardItemComponent],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss',
})
export class CardsListComponent {
  readonly cards = signal<BankCard[]>([
    {
      id: '1',
      cardNumber: '4276 1234 5678 9012',
      holderName: 'Иванов Иван Иванович',
      expiryDate: '12/26',
      isBlocked: false,
      balance: 156320,
    },
    {
      id: '2',
      cardNumber: '5536 9876 5432 1098',
      holderName: 'Иванов Иван Иванович',
      expiryDate: '06/25',
      isBlocked: true,
      balance: 43500,
    },
    {
      id: '3',
      cardNumber: '2200 5555 7777 3333',
      holderName: 'Иванов Иван Иванович',
      expiryDate: '09/27',
      isBlocked: false,
      balance: 890000,
    },
  ]);

  readonly activeCardsCount = computed(() => this.cards().filter((card) => !card.isBlocked).length);

  readonly hasBlockedCards = computed(() => this.cards().some((card) => card.isBlocked));

  onToggleBlock(cardId: string): void {
    this.cards.update((cards) =>
      cards.map((card) => (card.id === cardId ? { ...card, isBlocked: !card.isBlocked } : card)),
    );
  }
}
