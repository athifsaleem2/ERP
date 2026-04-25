import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './pages/layout/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';

// SALES
import { SalesInvoiceComponent } from './pages/Sales/sales-invoice/sales-invoice.component';
import { SalesInvoiceListComponent } from './pages/Sales/sales-invoice-list/sales-invoice-list.component';
import { SalesReturnComponent } from './pages/Sales/sales-return/sales-return.component';
import { SalesReturnListComponent } from './pages/Sales/sales-return-list/sales-return-list.component';
import { QuotationsComponent } from './pages/Sales/quotations/quotations.component';
import { QuotationsListComponent } from './pages/Sales/quotations-list/quotations-list.component';
import { CustomersComponent } from './pages/Sales/customers/customers.component';
import { AddCustomerComponent } from './pages/Sales/add-customer/add-customer.component';
import { ReceiptsComponent } from './pages/Sales/receipts/receipts.component';

// INVENTORY
import { ProductListComponent } from './pages/Inventory/product-list/product-list.component';
import { AddProductComponent } from './pages/Inventory/add-product/add-product.component';

// PURCHASE
import { PurchaseInvoiceComponent } from './pages/Purchase/purchase-invoice/purchase-invoice.component';
import { PurchaseInvoiceListComponent } from './pages/Purchase/purchase-invoice-list/purchase-invoice-list.component';
import { PurchaseReturnComponent } from './pages/Purchase/purchase-return/purchase-return.component';
import { PurchaseReturnListComponent } from './pages/Purchase/purchase-return-list/purchase-return-list.component';
import { SuppliersComponent } from './pages/Purchase/suppliers/suppliers.component';
import { AddSupplierComponent } from './pages/Purchase/add-supplier/add-supplier.component';
import { PaymentComponent } from './pages/Purchase/payment/payment.component';
import { PaymentListComponent } from './pages/Purchase/payment-list/payment-list.component';

// INVENTORY
import { ProductsComponent } from './pages/Inventory/products/products.component';
import { CategoriesComponent } from './pages/Inventory/categories/categories.component';
import { StockInComponent } from './pages/Inventory/stock-in/stock-in.component';
import { StockOutComponent } from './pages/Inventory/stock-out/stock-out.component';
import { StockTransferComponent } from './pages/Inventory/stock-transfer/stock-transfer.component';
import { StockReportComponent } from './pages/Inventory/stock-report/stock-report.component';
import { StockInListComponent } from './pages/Inventory/stock-in-list/stock-in-list.component';
import { StockOutListComponent } from './pages/Inventory/stock-out-list/stock-out-list.component';
import { StockTransferListComponent } from './pages/Inventory/stock-transfer-list/stock-transfer-list.component';

// LOAN MANAGEMENT
import { LoanApplicationComponent } from './pages/loan/loan-application/loan-application.component';
import { LoanApprovalComponent } from './pages/loan/loan-approval/loan-approval.component';
import { EmiScheduleComponent } from './pages/loan/emi-schedule/emi-schedule.component';
import { EmiPaymentsComponent } from './pages/loan/emi-payments/emi-payments.component';
import { PenaltyManagementComponent } from './pages/loan/penalty-management/penalty-management.component';
import { LoanReportsComponent } from './pages/loan/loan-reports/loan-reports.component';

// FINANCE
import { AccountsComponent } from './pages/finance/accounts/accounts.component';
import { CashBookComponent } from './pages/finance/cash-book/cash-book.component';
import { BankTransactionsComponent } from './pages/finance/bank-transactions/bank-transactions.component';
import { ExpenseEntryComponent } from './pages/finance/expense-entry/expense-entry.component';
import { ProfitLossComponent } from './pages/finance/profit-loss/profit-loss.component';

// HRMS
import { EmployeesComponent } from './pages/hrms/employees/employees.component';
import { AttendanceComponent } from './pages/hrms/attendance/attendance.component';
import { PayrollComponent } from './pages/hrms/payroll/payroll.component';
import { LeaveManagementComponent } from './pages/hrms/leave-management/leave-management.component';

import { AddEmployeeComponent } from './pages/hrms/add-employee/add-employee.component';
import { MarkAttendanceComponent } from './pages/hrms/mark-attendance/mark-attendance.component';
import { GeneratePayrollComponent } from './pages/hrms/generate-payroll/generate-payroll.component';
import { ApplyLeaveComponent } from './pages/hrms/apply-leave/apply-leave.component';
// REPORTS
import { SalesReportComponent } from './pages/report/sales-report/sales-report.component';
import { PurchaseReportComponent } from './pages/report/purchase-report/purchase-report.component';
import { InventoryReportComponent } from './pages/report/inventory-report/inventory-report.component';
import { LoanReportComponent } from './pages/report/loan-report/loan-report.component';
import { FinanceReportComponent } from './pages/report/finance-report/finance-report.component';

// SETTINGS
import { UserManagementComponent } from './pages/settings/user-management/user-management.component';
import { RolesPermissionsComponent } from './pages/settings/roles-permissions/roles-permissions.component';
import { CompanySettingsComponent } from './pages/settings/company-settings/company-settings.component';
import { TaxSettingsComponent } from './pages/settings/tax-settings/tax-settings.component';
import { AddUserComponent } from './pages/settings/add-user/add-user.component';
import { AddRoleComponent } from './pages/settings/add-role/add-role.component';
import { AddTaxRuleComponent } from './pages/settings/add-tax-rule/add-tax-rule-component.component';

export const routes: Routes = [
  // DEFAULT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // LOGIN
  { path: 'login', component: LoginComponent },

  // MAIN LAYOUT
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [

      // DASHBOARD HOME
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },


      // SALES
      { path: 'sales-invoice', component: SalesInvoiceComponent },
      { path: 'sales-invoice-list', component: SalesInvoiceListComponent },
      { path: 'sales-return-list', component: SalesReturnListComponent },
      { path: 'sales-return', component: SalesReturnComponent },
      { path: 'quotations-list', component: QuotationsListComponent },
      { path: 'quotations', component: QuotationsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'receipts', component: ReceiptsComponent },

      // INVENTORY
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductComponent },

      // PURCHASE
      { path: 'purchase-invoice', component: PurchaseInvoiceComponent },
      { path: 'purchase-invoice-list', component: PurchaseInvoiceListComponent },
      { path: 'purchase-return', component: PurchaseReturnComponent },
      { path: 'purchase-return-list', component: PurchaseReturnListComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'payments-list', component: PaymentListComponent },
      { path: 'payments', component: PaymentComponent },


      // INVENTORY
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'stock-in', component: StockInComponent },
      { path: 'stock-in-list', component: StockInListComponent },
      { path: 'stock-out', component: StockOutComponent },
      { path: 'stock-out-list', component: StockOutListComponent },
      { path: 'stock-transfer', component: StockTransferComponent },
      { path: 'stock-transfer-list', component: StockTransferListComponent },
      { path: 'stock-report', component: StockReportComponent },


      // LOAN MANAGEMENT
      { path: 'loan-application', component: LoanApplicationComponent },
      { path: 'loan-approval', component: LoanApprovalComponent },
      { path: 'emi-schedule', component: EmiScheduleComponent },
      { path: 'emi-payments', component: EmiPaymentsComponent },
      { path: 'penalty-management', component: PenaltyManagementComponent },
      { path: 'loan-reports', component: LoanReportsComponent },


      // FINANCE
      { path: 'accounts', component: AccountsComponent },
      { path: 'cash-book', component: CashBookComponent },
      { path: 'bank-transactions', component: BankTransactionsComponent },
      { path: 'expense-entry', component: ExpenseEntryComponent },
      { path: 'profit-loss', component: ProfitLossComponent },


      // HRMS
      { path: 'employees', component: EmployeesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'leave-management', component: LeaveManagementComponent },

      // HRMS SUB PAGES
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'mark-attendance', component: MarkAttendanceComponent },
      { path: 'generate-payroll', component: GeneratePayrollComponent },
      { path: 'apply-leave', component: ApplyLeaveComponent },
      // REPORTS
      { path: 'sales-report', component: SalesReportComponent },
      { path: 'purchase-report', component: PurchaseReportComponent },
      { path: 'inventory-report', component: InventoryReportComponent },
      { path: 'loan-report', component: LoanReportComponent },
      { path: 'finance-report', component: FinanceReportComponent },

      // SETTINGS
      { path: 'user-management', component: UserManagementComponent },
      { path: 'roles-permissions', component: RolesPermissionsComponent },
      { path: 'company-settings', component: CompanySettingsComponent },
      { path: 'tax-settings', component: TaxSettingsComponent },
      { path: 'add-tax-rule', component: AddTaxRuleComponent },

      { path: 'add-user', component: AddUserComponent },
      { path: 'add-role', component: AddRoleComponent },
    ]
  },

  // FALLBACK
  { path: '**', redirectTo: 'login' }

];