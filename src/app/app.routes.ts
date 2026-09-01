import { Routes } from '@angular/router';
import { authGuard } from './stores/auth/auth.guard';

export const routes: Routes = [
  {
    // Если пользователь зашел на /login
    path: 'login',
    // loadComponent — это "Ленивая загрузка". Файл компонента скачается в браузер ТОЛЬКО если пользователь зайдет на эту страницу. Это сильно ускоряет загрузку приложения!
    loadComponent: () => import('./auth/auth').then((m) => m.AuthComponent),
  },
  {
    // Пустой путь '' — это главная страница приложения
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    // canActivate — это массив "вышибал". Пока все гварды в этом списке не скажут true, страница не загрузится.
    canActivate: [authGuard],
  },
];
