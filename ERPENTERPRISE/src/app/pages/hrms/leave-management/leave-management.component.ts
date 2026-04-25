import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, LeaveRequest } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  today = new Date();
  leaveList: LeaveRequest[] = [];
  loading = false;
  activeTab = 'All';
  tabs = ['All', 'Pending', 'Approved', 'Rejected'];

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hrmsService.getLeaveRequests().subscribe({
      next: (d) => { this.leaveList = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    return this.activeTab === 'All' ? this.leaveList
      : this.leaveList.filter(l => l.status === this.activeTab);
  }

  get pendingCount()  { return this.leaveList.filter(l => l.status === 'Pending').length; }
  get approvedCount() { return this.leaveList.filter(l => l.status === 'Approved').length; }
  get rejectedCount() { return this.leaveList.filter(l => l.status === 'Rejected').length; }

  statusColor(s: string) {
    return s === 'Approved' ? 'success' : s === 'Rejected' ? 'danger' : 'warning';
  }

  approve(id: number | undefined) {
    if (!id) return;
    this.hrmsService.approveLeave(id).subscribe({ next: () => this.load() });
  }

  reject(id: number | undefined) {
    if (!id || !confirm('Reject this leave?')) return;
    this.hrmsService.rejectLeave(id).subscribe({ next: () => this.load() });
  }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this request?')) return;
    this.hrmsService.deleteLeaveRequest(id).subscribe({ next: () => this.load() });
  }

  applyLeave() { this.router.navigate(['/dashboard/apply-leave']); }
}