import { Component } from '@angular/core';

interface Movimiento {
  descripcion: string;
  fecha: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sueldoFijo = 0;
  sueldoVariable = 0;
  ingresosExtra = 0;

  movimientos: Movimiento[] = [
    { descripcion: 'Sueldo Fijo', fecha: '19 Ago 2026', monto: 150, tipo: 'gasto' },
    { descripcion: 'Sueldo Variable', fecha: '16 Ago 2026', monto: 50, tipo: 'gasto' },
    { descripcion: 'Ingreso extra', fecha: '17 Ago 2026', monto: 180, tipo: 'gasto' },
    { descripcion: 'Sueldo Fijo', fecha: '15 Ago 2026', monto: 3800, tipo: 'ingreso' },
    { descripcion: 'Sueldo Variable', fecha: '14 Ago 2026', monto: 75, tipo: 'gasto' },
  ];
}