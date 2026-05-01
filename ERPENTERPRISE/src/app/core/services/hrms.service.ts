import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  empCode: string;
  name: string;
  email?: string;
  phone?: string;
  department: string;
  designation?: string;
  basicSalary: number;
  joiningDate: string;
  status: string;
  address?: string;
  createdAt?: string;
}

export interface Attendance {
  id?: number;
  employeeId: number;
  employee?: Employee;
  date: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
  remarks?: string;
}

export interface PayrollRecord {
  id?: number;
  employeeId: number;
  employee?: Employee;
  month: number;
  year: number;
  basicSalary: number;
  hra: number;
  da: number;
  bonus: number;
  pfDeduction: number;
  taxDeduction: number;
  otherDeductions: number;
  netSalary: number;
  generatedDate?: string;
  status: string;
}

export interface LeaveRequest {
  id?: number;
  employeeId: number;
  employee?: Employee;
  leaveType: string;
  fromDate: string;
  toDate: string;
  totalDays?: number;
  reason?: string;
  status: string;
  remarks?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class HrmsService {
  private base = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // ── Employees ─────────────────────────────────────────────
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.base}/Employees`);
  }
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.base}/Employees/${id}`);
  }
  generateEmpCode(): Observable<{ empCode: string }> {
    return this.http.get<{ empCode: string }>(`${this.base}/Employees/generate-code`);
  }
  createEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.base}/Employees`, emp);
  }
  updateEmployee(id: number, emp: Employee): Observable<void> {
    return this.http.put<void>(`${this.base}/Employees/${id}`, emp);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Employees/${id}`);
  }

  // ── Attendance ────────────────────────────────────────────
  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.base}/Attendance`);
  }
  getAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.base}/Attendance/date/${date}`);
  }
  createAttendance(a: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.base}/Attendance`, a);
  }
  bulkMarkAttendance(records: Attendance[]): Observable<Attendance[]> {
    return this.http.post<Attendance[]>(`${this.base}/Attendance/bulk`, records);
  }
  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Attendance/${id}`);
  }

  // ── Payroll ───────────────────────────────────────────────
  getPayroll(): Observable<PayrollRecord[]> {
    return this.http.get<PayrollRecord[]>(`${this.base}/Payroll`);
  }
  getPayrollByMonthYear(month: number, year: number): Observable<PayrollRecord[]> {
    return this.http.get<PayrollRecord[]>(`${this.base}/Payroll/filter?month=${month}&year=${year}`);
  }
  generatePayroll(record: PayrollRecord): Observable<PayrollRecord> {
    return this.http.post<PayrollRecord>(`${this.base}/Payroll`, record);
  }
  markPayrollPaid(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/Payroll/${id}/mark-paid`, {});
  }
  deletePayroll(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Payroll/${id}`);
  }

  // ── Leave Requests ────────────────────────────────────────
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.base}/LeaveRequests`);
  }
  createLeaveRequest(req: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.base}/LeaveRequests`, req);
  }
  approveLeave(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/LeaveRequests/${id}/approve`, '');
  }
  rejectLeave(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/LeaveRequests/${id}/reject`, '');
  }
  deleteLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/LeaveRequests/${id}`);
  }
}
