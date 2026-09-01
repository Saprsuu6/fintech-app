import { createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import { AuthActions } from './auth.actions';

// 1. Описываем, как выглядит наш стейт (состояние) авторизации
export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean; // Полезно для показа крутилки (спиннера) на кнопке "Войти"
}

// 2. Задаем начальное состояние (при запуске приложения мы не авторизованы)
const savedToken = localStorage.getItem('auth_token');
const savedUser = localStorage.getItem('auth_user');

export const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,

  // Когда нажали "Войти" — включаем спиннер загрузки и очищаем старые ошибки
  on(AuthActions.login, (state) => ({
    ...state, // Берем всё текущее состояние...
    isLoading: true, // ...и перезаписываем только эти два поля
    error: null,
  })),

  // Когда сервер ответил успехом — сохраняем юзера и токен, выключаем спиннер
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user: user,
    token: token,
    isLoading: false,
  })),

  // Когда сервер вернул ошибку (неверный пароль) — записываем текст ошибки
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // Когда выходим из аккаунта — возвращаем чистый пустой стейт
  on(AuthActions.logout, () => ({
    user: null,
    token: null,
    error: null,
    isLoading: false,
  })),
);
