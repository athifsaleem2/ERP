import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StockEntry {
  id?: number;
  productId: number;
  productName: string;
  type: 'IN' | 'OUT' | 'TRANSFER';
  quantity: number;
  date: string;
  reference?: string;   // Supplier for IN, Reason for OUT
  fromLocation?: string; 
  toLocation?: string;
  notes?: string;
}

export interface StockSummary {
  productId: number;
  productName: string;
  category: string;
  totalIn: number;
  totalOut: number;
  availableStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:52888/api/StockEntries';

  constructor(private http: HttpClient) { }

  getRecentEntries(): Observable<StockEntry[]> {
    return this.http.get<StockEntry[]>(this.apiUrl).pipe(
      map(entries => entries.reverse()) // Reverse to have the latest first natively
    );
  }

  addStockEntry(entry: StockEntry): Observable<StockEntry> {
    return this.http.post<StockEntry>(this.apiUrl, entry);
  }

  // Calculate summary based on ledger and mock product mapping
  getStockReport(products: any[], categories: any[]): Observable<StockSummary[]> {
    return this.http.get<StockEntry[]>(this.apiUrl).pipe(
      map(stockLedger => {
        const summaries: StockSummary[] = products.map(p => {
          const entriesForProduct = stockLedger.filter(e => e.productId === p.id);
          
          const totalIn = entriesForProduct
            .filter(e => e.type === 'IN')
            .reduce((sum, e) => sum + e.quantity, 0);

          // Transfers don't change global total in/out unless tracking by location 
          // For a global report, OUT decreases global stock
          const totalOut = entriesForProduct
            .filter(e => e.type === 'OUT')
            .reduce((sum, e) => sum + e.quantity, 0);

          const availableStock = totalIn - totalOut;

          let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
          if (availableStock <= 0) status = 'Out of Stock';
          else if (availableStock <= 10) status = 'Low Stock';

          // Map category ID to Category Name
          const categoryObj = categories.find(c => c.name === p.category || c.id === p.categoryId);
          const categoryName = categoryObj ? categoryObj.name : (p.category || 'Uncategorized');

          return {
            productId: p.id || 0,
            productName: p.name,
            category: categoryName,
            totalIn,
            totalOut,
            availableStock,
            status
          };
        });

        return summaries;
      })
    );
  }
}
