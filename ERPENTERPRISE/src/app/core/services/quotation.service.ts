import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuotationItem {
  id?: number;
  quotationId?: number;
  productId?: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Quotation {
  id?: number;
  quotationNumber: string;
  customerId?: number;
  customerName: string;
  date: string;
  expiryDate?: string;
  reference?: string;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  notes?: string;
  items: QuotationItem[];
}

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = `${environment.apiUrl}/Quotations`;

  constructor(private http: HttpClient) { }

  getQuotations(): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(this.apiUrl);
  }

  getQuotation(id: number): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.apiUrl}/${id}`);
  }

  createQuotation(quotation: Quotation): Observable<Quotation> {
    return this.http.post<Quotation>(this.apiUrl, quotation);
  }

  updateQuotation(id: number, quotation: Quotation): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, quotation);
  }

  deleteQuotation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
