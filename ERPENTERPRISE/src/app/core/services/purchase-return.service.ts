import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseReturnItem {
  id?: number;
  purchaseReturnId?: number;
  productId?: number;
  productName: string;
  quantity: number;
  price: number;
  taxPercentage: number;
  total: number;
}

export interface PurchaseReturn {
  id?: number;
  returnNumber: string;
  invoiceNumber: string;
  supplierId?: number;
  returnDate: string;
  reason: string;
  totalAmount: number;
  items: PurchaseReturnItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnService {
  private apiUrl = `${environment.apiUrl}/PurchaseReturn`;

  constructor(private http: HttpClient) { }

  getReturns(): Observable<PurchaseReturn[]> {
    return this.http.get<PurchaseReturn[]>(this.apiUrl);
  }

  getReturn(id: number): Observable<PurchaseReturn> {
    return this.http.get<PurchaseReturn>(`${this.apiUrl}/${id}`);
  }

  createReturn(purchaseReturn: PurchaseReturn): Observable<PurchaseReturn> {
    return this.http.post<PurchaseReturn>(this.apiUrl, purchaseReturn);
  }

  deleteReturn(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
