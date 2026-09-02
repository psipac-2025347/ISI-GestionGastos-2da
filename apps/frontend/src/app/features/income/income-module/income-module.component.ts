import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService, IncomeSummary } from '../../../core/services/income.service';

type IncomeType = 'FIJO' | 'VARIABLE' | 'EXTRA';

@Component({
  selector: 'app-income-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-module.component.html',
  styleUrls: ['./income-module.component.css'],
})
export class IncomeModuleComponent implements OnInit {
  @Input({ required: true }) type!: IncomeType;
  @Input({ required: true }) title!: string;

  saldo = 0;
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
    this.loadSummary();
  }

  loadSummary(): void {
    this.incomeService.getSummary().subscribe({
      next: (summary: IncomeSummary) => {
        this.saldo = summary[this.type];
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
        this.loadSummary();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al registrar el ingreso';
      },
    });
  }

  onGastosClick(): void {
    alert('El módulo de Gastos estará disponible próximamente.');
  }
}