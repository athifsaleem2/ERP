import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesInvoiceItem {
  id?: number;
  invoiceId?: number;
  productId?: number;
  productName: string;
  quantity: number;
  price: number;
  taxPercentage: number;
  total: number;
}

export interface SalesInvoice {
  id?: number;
  invoiceNumber: string;
  customerId?: number;
  customerName: string;
  paymentMode: string;
  dueDate: string;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  notes: string;
  items: SalesInvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {
  private apiUrl = `${environment.apiUrl}/SalesInvoice`;

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<SalesInvoice[]> {
    return this.http.get<SalesInvoice[]>(this.apiUrl);
  }

  getInvoice(id: number): Observable<SalesInvoice> {
    return this.http.get<SalesInvoice>(`${this.apiUrl}/${id}`);
  }

  createInvoice(invoice: SalesInvoice): Observable<SalesInvoice> {
    return this.http.post<SalesInvoice>(this.apiUrl, invoice);
  }

  updateInvoice(id: number, invoice: SalesInvoice): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
