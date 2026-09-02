import { Component, Input } from '@angular/core';
import { Movimiento } from '../movement.util';

@Component({
  selector: 'app-finance-movements',
  standalone: true,
  imports: [],
  templateUrl: './finance-movements.component.html',
  styleUrls: ['./finance-movements.component.css'],
})
export class FinanceMovementsComponent {
  @Input({ required: true }) movimientos: Movimiento[] = [];
}