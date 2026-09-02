import { IncomeRecord } from '../core/services/income.service';

export interface Movimiento {
  descripcion: string;
  fecha: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  modulo: 'FIJO' | 'VARIABLE' | 'EXTRA';
}

const TYPE_LABELS: Record<string, string> = {
  FIJO: 'Sueldo Fijo',
  VARIABLE: 'Sueldo Variable',
  EXTRA: 'Ingreso Extra',
};

export function mapRecordsToMovimientos(records: IncomeRecord[]): Movimiento[] {
  return records.map((r) => ({
    descripcion: TYPE_LABELS[r.type] || r.type,
    fecha: new Date(r.date).toLocaleDateString('es-GT', {
      day: '2-digit', month: 'short', year: 'numeric',
    }),
    monto: Number(r.netAmount),
    tipo: 'ingreso' as const,
    modulo: r.type,
  }));
}