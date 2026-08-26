import { Injectable, signal, effect } from '@angular/core';
import { BankCard } from '../models';

const DEFAULT_CARDS: BankCard[] = [
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
];

@Injectable({ providedIn: 'root' })
export class CardsService {
  readonly cards = signal<BankCard[]>([]);

  constructor() {
    // 1. При загрузке восстанавливаем данные из localStorage
    const savedCards = localStorage.getItem('fintech-cards');
    if (savedCards) {
      this.cards.set(JSON.parse(savedCards));
    } else {
      this.cards.set(DEFAULT_CARDS);
    }

    // 2. Эффект автоматически отслеживает сигнал cards и при любых 
    // изменениях мгновенно переписывает localStorage
    effect(() => {
      localStorage.setItem('fintech-cards', JSON.stringify(this.cards()));
    });
  }

  toggleBlock(cardId: string): void {
    this.cards.update((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, isBlocked: !card.isBlocked } : card
      )
    );
  }

  updateBalance(cardNumber: string, amount: number, type: 'credit' | 'debit'): void {
    this.cards.update((cards) =>
      cards.map((card) => {
        if (card.cardNumber === cardNumber) {
          const newBalance =
            type === 'debit' ? card.balance - amount : card.balance + amount;
          return { ...card, balance: newBalance };
        }
        return card;
      })
    );
  }
}
