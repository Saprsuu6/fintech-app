import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// 1. Сначала мы должны "зацепиться" за нужный кусок общего стейта приложения.
// 'auth' — это имя ключа, под которым наш редюсер будет зарегистрирован в приложении.
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2. Достаем флаг загрузки (крутится ли спиннер?)
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading,
);

// 3. Достаем текущего пользователя
export const selectUser = createSelector(selectAuthState, (state: AuthState) => state.user);

// 4. Достаем ошибку, если она есть
export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);

// 5. А вот тут магия вычисляемых свойств!
// Нам не нужно хранить флаг isLoggedIn в State. Мы вычисляем его на лету:
// Если токен есть (!null), значит мы залогинены (true).
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.token,
);
