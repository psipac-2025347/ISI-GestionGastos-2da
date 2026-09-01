import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SueldoFijoComponent } from './features/income/sueldo-fijo/sueldo-fijo.component';
import { SueldoVariableComponent } from './features/income/sueldo-variable/sueldo-variable.component';
import { IngresoExtraComponent } from './features/income/ingreso-extra/ingreso-extra.component';
import { FondoEmergenciaComponent } from './features/income/emergency-fund/fondo-emergencia.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sueldo-fijo', component: SueldoFijoComponent },
      { path: 'sueldo-variable', component: SueldoVariableComponent },
      { path: 'ingreso-extra', component: IngresoExtraComponent },
      { path: 'fondo-emergencia', component: FondoEmergenciaComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];