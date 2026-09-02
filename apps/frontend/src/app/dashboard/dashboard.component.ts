import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IncomeService, IncomeSummary } from '../core/services/income.service';
import { FinanceSummaryComponent } from '../shared/finance-summary/finance-summary.component';
import { FinanceMovementsComponent } from '../shared/finance-movements/finance-movements.component';
import { mapRecordsToMovimientos, Movimiento } from '../shared/movement.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FinanceSummaryComponent, FinanceMovementsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sueldoFijo = signal(0);
  sueldoVariable = signal(0);
  ingresosExtra = signal(0);
  movimientos = signal<Movimiento[]>([]);

  constructor(private http: HttpClient, private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/auth/me`).subscribe({ next: () => {} });
    this.reload();
  }

  reload(): void {
    this.incomeService.getSummary().subscribe({
      next: (summary: IncomeSummary) => {
        this.sueldoFijo.set(summary.FIJO);
        this.sueldoVariable.set(summary.VARIABLE);
        this.ingresosExtra.set(summary.EXTRA);
      },
    });
    this.incomeService.list().subscribe({
      next: (records) => {
        this.movimientos.set(mapRecordsToMovimientos(records));
      },
    });
  }
}