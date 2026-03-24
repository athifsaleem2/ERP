import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

ngOnInit() {
  new Chart("salesChart", {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Sales',
        data: [5000, 8000, 6000, 9000, 7000, 10000],
        borderColor: '#0d6efd',
        fill: false
      }]
    }
  });
}
}
