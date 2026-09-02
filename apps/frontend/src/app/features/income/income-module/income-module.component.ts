import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService, IncomeSummary } from '../../../core/services/income.service';
import { FinanceSummaryComponent } from '../../../shared/finance-summary/finance-summary.component';
import { FinanceMovementsComponent } from '../../../shared/finance-movements/finance-movements.component';
import { mapRecordsToMovimientos, Movimiento } from '../../../shared/movement.util';

type IncomeType = 'FIJO' | 'VARIABLE' | 'EXTRA';

@Component({
  selector: 'app-income-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinanceSummaryComponent, FinanceMovementsComponent],
  templateUrl: './income-module.component.html',
  styleUrls: ['./income-module.component.css'],
})
export class IncomeModuleComponent implements OnInit {
  @Input({ required: true }) type!: IncomeType;
  @Input({ required: true }) title!: string;

  saldo = signal(0);
  sueldoFijo = signal(0);
  sueldoVariable = signal(0);
  ingresosExtra = signal(0);
  movimientos = signal<Movimiento[]>([]);

  showForm = false;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  incomeForm: FormGroup;

  constructor(private incomeService: IncomeService, private fb: FormBuilder) {
    this.incomeForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.incomeService.getSummary().subscribe({
      next: (summary: IncomeSummary) => {
        this.saldo.set(summary[this.type]);
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

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.errorMessage = null;
    this.successMessage = null;
  }

  onSubmit(): void {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    const { amount, description } = this.incomeForm.value;
    this.incomeService.create({ type: this.type, amount, description }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Ingreso registrado correctamente';
        this.incomeForm.reset();
        this.showForm = false;
        this.reload();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al registrar el ingreso';
      },
    });
  }

  onGastosClick(): void {
    alert('El modulo de Gastos estara disponible proximamente.');
  }
}