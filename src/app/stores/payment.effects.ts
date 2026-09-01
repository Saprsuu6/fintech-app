import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, of, switchMap, withLatestFrom } from 'rxjs';
import { selectIsLoggedIn } from './auth/auth.selectors';
import { PaymentActions } from './payment.actions';

export const processPaymentEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      // 1. Ждем, когда компонент вызовет экшен Make Payment
      ofType(PaymentActions.makePayment),

      // 2. withLatestFrom — КРУТЕЙШИЙ оператор RxJS!
      // В тот момент, когда пришел экшен Make Payment, он моментально "подсматривает"
      // в Store (глобальное состояние) и достает оттуда ответ на вопрос selectIsLoggedIn.
      withLatestFrom(store.select(selectIsLoggedIn)),

      // 3. switchMap теперь получает МАССИВ из двух элементов.
      // Первый элемент [0] — это сам экшен (с суммой и картой)
      // Второй элемент [1] — это статус логина (true/false) из withLatestFrom
      switchMap(([action, isLoggedIn]) => {
        // 4. ЗАЩИТА: Если токена нет — рубим процесс на корню!
        if (!isLoggedIn) {
          // Возвращаем экшен ошибки. Транзакция отменяется.
          return of(PaymentActions.paymentBlocked({ reason: 'Требуется авторизация!' }));
        }

        // 5. Если всё ок, имитируем успешный платеж с задержкой 1 секунда
        return of(
          PaymentActions.paymentSuccess({ id: 'TXN-' + Math.random().toString(36).substr(2, 9) }),
        ).pipe(delay(1000));
      }),
    );
  },
  { functional: true },
);
