import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IncomeSummary {
  FIJO: number;
  VARIABLE: number;
  EXTRA: number;
}

export interface CreateIncomeDto {
  type: 'FIJO' | 'VARIABLE' | 'EXTRA';
  amount: number;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private apiUrl = `${environment.apiUrl}/income`;

  constructor(private http: HttpClient) {}

  create(data: CreateIncomeDto): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getSummary(): Observable<IncomeSummary> {
    return this.http.get<IncomeSummary>(`${this.apiUrl}/summary`);
  }
}