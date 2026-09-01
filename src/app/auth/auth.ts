import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../stores/auth/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoggedIn,
  selectUser,
} from '../stores/auth/auth.selectors';

@Component({
  imports: [],
  selector: 'app-auth',
  styleUrl: './auth.scss',
  templateUrl: './auth.html',
})
export class AuthComponent {
  // Инжектим Store
  private readonly store = inject(Store);
  // Локальное состояние компонента (что ввели в инпуты)
  readonly username = signal('');
  readonly password = signal('');

  // --- ЧИТАЕМ ДАННЫЕ ИЗ NGRX STORE ---
  // Метод selectSignal магически превращает селектор NgRx в обычный Angular Signal!
  readonly isLoading = this.store.selectSignal(selectAuthLoading);
  readonly error = this.store.selectSignal(selectAuthError);
  readonly isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  readonly user = this.store.selectSignal(selectUser);

  onLogin() {
    // --- ПИШЕМ ДАННЫЕ В NGRX STORE ---
    // Диспатчим (отправляем) экшен логина.
    // Дальше в дело вступит Effect, подождет 1.5 секунды и вернет успех или ошибку!
    this.store.dispatch(
      AuthActions.login({
        username: this.username(),
        password: this.password(),
      }),
    );
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.username.set('');
    this.password.set('');
  }
}
