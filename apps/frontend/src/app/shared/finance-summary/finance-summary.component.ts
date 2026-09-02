import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finance-summary',
  standalone: true,
  imports: [],
  templateUrl: './finance-summary.component.html',
  styleUrls: ['./finance-summary.component.css'],
})
export class FinanceSummaryComponent {
  @Input({ required: true }) sueldoFijo = 0;
  @Input({ required: true }) sueldoVariable = 0;
  @Input({ required: true }) ingresosExtra = 0;
}