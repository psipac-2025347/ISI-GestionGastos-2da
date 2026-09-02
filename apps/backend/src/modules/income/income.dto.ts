export interface CreateIncomeDto {
  type: 'FIJO' | 'VARIABLE' | 'EXTRA';
  amount: number;
  description?: string;
}