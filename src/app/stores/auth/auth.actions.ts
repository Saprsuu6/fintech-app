import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models';

export const AuthActions = createActionGroup({
  source: 'Auth', // Это префикс, который будет у всех экшенов (например: [Auth] Login)
  events: {
    // Пользователь отправляет форму логина
    Login: props<{ username: string; password: string }>(),

    // Успешный ответ от сервера
    'Login Success': props<{ user: User; token: string }>(),

    // Ошибка от сервера
    'Login Failure': props<{ error: string }>(),

    // Выход из аккаунта (emptyProps означает, что данных нет)
    Logout: emptyProps(),
  },
});
