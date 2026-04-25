import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseInvoiceItem {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  costPrice: number;
  total: number;
}

export interface PurchaseInvoice {
  id?: number;
  invoiceNumber: string;
  supplierId: number;
  date?: string;
  subtotal: number;
  tax: number;
  grandTotal: number;
  notes?: string;
  items: PurchaseInvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {
  private apiUrl = 'http://localhost:52888/api/PurchaseInvoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<PurchaseInvoice[]> {
    return this.http.get<PurchaseInvoice[]>(this.apiUrl);
  }

  getInvoice(id: number): Observable<PurchaseInvoice> {
    return this.http.get<PurchaseInvoice>(`${this.apiUrl}/${id}`);
  }

  getInvoiceByNumber(invoiceNumber: string): Observable<PurchaseInvoice> {
    return this.http.get<PurchaseInvoice>(`${this.apiUrl}/number/${invoiceNumber}`);
  }

  createInvoice(invoice: PurchaseInvoice): Observable<PurchaseInvoice> {
    return this.http.post<PurchaseInvoice>(this.apiUrl, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
