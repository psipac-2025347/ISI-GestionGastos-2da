import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export interface IncomeRecord {
  id: string;
  type: 'FIJO' | 'VARIABLE' | 'EXTRA';
  grossAmount: number;
  deduction: number;
  netAmount: number;
  description: string | null;
  date: string;
}

const NO_CACHE_HEADERS = new HttpHeaders({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
});

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private apiUrl = `${environment.apiUrl}/income`;

  constructor(private http: HttpClient) {}

  create(data: CreateIncomeDto): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getSummary(): Observable<IncomeSummary> {
    return this.http.get<IncomeSummary>(`${this.apiUrl}/summary`, { headers: NO_CACHE_HEADERS });
  }

  list(): Observable<IncomeRecord[]> {
    return this.http.get<IncomeRecord[]>(this.apiUrl, { headers: NO_CACHE_HEADERS });
  }
}