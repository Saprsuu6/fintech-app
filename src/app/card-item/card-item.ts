import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BankCard } from '../models';

@Component({
  selector: 'app-card-item',
  imports: [CurrencyPipe],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss',
})
export class CardItemComponent {
  readonly card = input.required<BankCard>();
  readonly blockToggled = output<string>();

  onToggleBlock(): void {
    this.blockToggled.emit(this.card().id);
  }
}
