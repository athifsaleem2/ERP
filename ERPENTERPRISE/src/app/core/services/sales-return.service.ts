import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesReturnItem {
  id?: number;
  salesReturnId?: number;
  productId?: number;
  productName: string;
  quantity: number;
  price: number;
  taxPercentage: number;
  total: number;
}

export interface SalesReturn {
  id?: number;
  returnNumber: string;
  invoiceNumber: string;
  customerId?: number;
  customerName: string;
  returnDate: string;
  reason: string;
  totalAmount: number;
  items: SalesReturnItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SalesReturnService {
  private apiUrl = `http://localhost:52888/api/SalesReturn`;

  constructor(private http: HttpClient) { }

  getReturns(): Observable<SalesReturn[]> {
    return this.http.get<SalesReturn[]>(this.apiUrl);
  }

  getReturn(id: number): Observable<SalesReturn> {
    return this.http.get<SalesReturn>(`${this.apiUrl}/${id}`);
  }

  createReturn(salesReturn: SalesReturn): Observable<SalesReturn> {
    return this.http.post<SalesReturn>(this.apiUrl, salesReturn);
  }

  deleteReturn(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
