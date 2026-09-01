import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './stores/auth/auth.actions';
import { selectIsLoggedIn, selectUser } from './stores/auth/auth.selectors';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly store = inject(Store);

  readonly title = 'Fintech App';
  readonly isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  readonly user = this.store.selectSignal(selectUser);

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
