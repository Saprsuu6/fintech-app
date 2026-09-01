import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { providePaymentGateway } from './payment-gateway.config';
import * as authEffects from './stores/auth/auth.effects';
import { authReducer } from './stores/auth/auth.reducer';
import * as paymentEffects from './stores/payment.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePaymentGateway({
      apiUrl: 'https://api.fintech-app.local/v1',
      defaultCurrency: 'RUB',
      maxTransactionLimit: 1_000_000,
    }),

    // 1. Подключаем глобальный Store и говорим, что за ветку 'auth' отвечает authReducer
    provideStore({
      auth: authReducer,
    }),

    // 2. Подключаем эффекты
    provideEffects(authEffects, paymentEffects),
  ],
};
