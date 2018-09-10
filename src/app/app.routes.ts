import { Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: ShellComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '**',
    component: WelcomeComponent
  }
];
