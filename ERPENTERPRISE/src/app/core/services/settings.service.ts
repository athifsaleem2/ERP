import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppUser {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  fullName?: string;
  role?: string;
  createdAt?: string;
}

export interface Role {
  id?: number;
  name: string;
  description?: string;
  permissions?: string;
  status: string;
  createdAt?: string;
}

export interface TaxRule {
  id?: number;
  ruleName: string;
  taxType?: string;
  taxPercentage: number;
  minSalary?: number;
  maxSalary?: number;
  appliesTo?: string;
  status: string;
  createdAt?: string;
}

export interface CompanySetting {
  id?: number;
  companyName: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  taxNumber?: string;
  currency?: string;
  currencySymbol?: string;
  dateFormat?: string;
  logoUrl?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private base = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // ── Users ──────────────────────────────────────────────────
  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.base}/Users`);
  }
  getUser(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.base}/Users/${id}`);
  }
  createUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.base}/Users`, user);
  }
  updateUser(id: number, user: AppUser): Observable<void> {
    return this.http.put<void>(`${this.base}/Users/${id}`, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Users/${id}`);
  }

  // ── Roles ──────────────────────────────────────────────────
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.base}/Roles`);
  }
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.base}/Roles`, role);
  }
  updateRole(id: number, role: Role): Observable<void> {
    return this.http.put<void>(`${this.base}/Roles/${id}`, role);
  }
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Roles/${id}`);
  }

  // ── Tax Rules ──────────────────────────────────────────────
  getTaxRules(): Observable<TaxRule[]> {
    return this.http.get<TaxRule[]>(`${this.base}/TaxRules`);
  }
  createTaxRule(rule: TaxRule): Observable<TaxRule> {
    return this.http.post<TaxRule>(`${this.base}/TaxRules`, rule);
  }
  updateTaxRule(id: number, rule: TaxRule): Observable<void> {
    return this.http.put<void>(`${this.base}/TaxRules/${id}`, rule);
  }
  deleteTaxRule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/TaxRules/${id}`);
  }

  // ── Company Settings ───────────────────────────────────────
  getCompanySettings(): Observable<CompanySetting> {
    return this.http.get<CompanySetting>(`${this.base}/CompanySettings`);
  }
  saveCompanySettings(setting: CompanySetting): Observable<CompanySetting> {
    return this.http.post<CompanySetting>(`${this.base}/CompanySettings`, setting);
  }
}
