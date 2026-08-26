import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePaymentGateway } from './payment-gateway.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePaymentGateway({
      apiUrl: 'https://api.fintech-app.local/v1',
      defaultCurrency: 'RUB',
      maxTransactionLimit: 1_000_000,
    }),
  ],
};
