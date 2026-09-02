import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movimiento } from '../movement.util';
import { IncomeService } from '../../core/services/income.service';

type ModuloFiltro = 'FIJO' | 'VARIABLE' | 'EXTRA' | null;
type TipoFiltro = 'ingreso' | 'gasto' | null;

@Component({
  selector: 'app-finance-movements',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './finance-movements.component.html',
  styleUrls: ['./finance-movements.component.css'],
})
export class FinanceMovementsComponent {
  @Input({ required: true }) movimientos: Movimiento[] = [];
  @Output() created = new EventEmitter<void>();

  showModal = signal(false);
  selectedModulo = signal<ModuloFiltro>(null);
  selectedTipo = signal<TipoFiltro>(null);

  showAddForm = signal(false);
  addModulo = signal<'FIJO' | 'VARIABLE' | 'EXTRA' | null>(null);
  addTipo = signal<'ingreso' | 'gasto' | null>(null);
  addAmount: number | null = null;
  addDescription = '';
  addLoading = signal(false);
  addError = signal<string | null>(null);

  constructor(private incomeService: IncomeService) {}

  get preview(): Movimiento[] {
    return this.movimientos.slice(0, 5);
  }

  get filtered(): Movimiento[] {
    return this.movimientos.filter((m) => {
      const moduloOk = !this.selectedModulo() || m.modulo === this.selectedModulo();
      const tipoOk = !this.selectedTipo() || m.tipo === this.selectedTipo();
      return moduloOk && tipoOk;
    });
  }

  openModal(): void {
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  toggleModulo(modulo: ModuloFiltro): void {
    this.selectedModulo.set(this.selectedModulo() === modulo ? null : modulo);
  }

  toggleTipo(tipo: TipoFiltro): void {
    this.selectedTipo.set(this.selectedTipo() === tipo ? null : tipo);
  }

  toggleAddForm(): void {
    this.showAddForm.set(!this.showAddForm());
    this.addError.set(null);
  }

  selectAddModulo(modulo: 'FIJO' | 'VARIABLE' | 'EXTRA'): void {
    this.addModulo.set(modulo);
  }

  selectAddTipo(tipo: 'ingreso' | 'gasto'): void {
    this.addTipo.set(tipo);
  }

  submitAdd(): void {
    if (!this.addModulo() || !this.addTipo()) {
      this.addError.set('Selecciona un modulo y un tipo');
      return;
    }
    if (this.addTipo() === 'gasto') {
      this.addError.set('El registro de Gastos estara disponible proximamente');
      return;
    }
    if (!this.addAmount || this.addAmount <= 0) {
      this.addError.set('Ingresa un monto valido mayor a 0');
      return;
    }
    this.addLoading.set(true);
    this.addError.set(null);
    this.incomeService.create({
      type: this.addModulo()!,
      amount: this.addAmount,
      description: this.addDescription || undefined,
    }).subscribe({
      next: () => {
        this.addLoading.set(false);
        this.addAmount = null;
        this.addDescription = '';
        this.addModulo.set(null);
        this.addTipo.set(null);
        this.showAddForm.set(false);
        this.created.emit();
      },
      error: (err) => {
        this.addLoading.set(false);
        this.addError.set(err.error?.message || 'Error al registrar el movimiento');
      },
    });
  }
}