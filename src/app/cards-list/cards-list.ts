import { Component, computed, inject } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards-list',
  imports: [CardItemComponent],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss',
})
export class CardsListComponent {
  private readonly cardsService = inject(CardsService);

  readonly cards = this.cardsService.cards;

  readonly activeCardsCount = computed(() => this.cards().filter((card) => !card.isBlocked).length);

  readonly hasBlockedCards = computed(() => this.cards().some((card) => card.isBlocked));

  onToggleBlock(cardId: string): void {
    this.cardsService.toggleBlock(cardId);
  }
}
