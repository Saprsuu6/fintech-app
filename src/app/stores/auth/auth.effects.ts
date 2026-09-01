import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, of, switchMap, tap } from 'rxjs';
import { AuthActions } from './auth.actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      // 1. Слушаем ТОЛЬКО экшены типа "Login"
      ofType(AuthActions.login),

      // 2. Имитируем задержку сети в 1.5 секунды (чтобы увидеть спиннер загрузки)
      delay(1500),

      // 3. switchMap — важнейший оператор RxJS!
      // Он берет данные из экшена (username, password) и переключается на новый поток (запрос к серверу).
      // Если пользователь кликнет "Войти" 5 раз подряд, switchMap отменит 4 предыдущих запроса и выполнит только последний!
      switchMap(({ username, password }) => {
        // Тут в реальности был бы HTTP-запрос: return http.post(...).pipe(...)
        // Мы делаем мок (имитацию):
        if (username === 'admin' && password === '1234') {
          // Если логин/пароль верны, возвращаем экшен УСПЕХА
          return of(
            AuthActions.loginSuccess({
              user: { id: '1', username: 'admin', firstName: 'Админ' },
              token: 'fake-jwt-token-123',
            }),
          );
        } else {
          // Если ошибка, возвращаем экшен ОШИБКИ
          return of(
            AuthActions.loginFailure({
              error: 'Неверный логин или пароль',
            }),
          );
        }
      }),
    );
  },
  { functional: true },
);

export const saveAuthDataEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user, token }) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        // Перенаправляем на главную страницу после успешного входа!
        router.navigate(['/']);
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const clearAuthDataEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        // Перенаправляем на страницу входа после выхода!
        router.navigate(['/login']);
      }),
    );
  },
  { functional: true, dispatch: false },
);
