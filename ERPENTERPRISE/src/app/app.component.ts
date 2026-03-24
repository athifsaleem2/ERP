import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

imports: [RouterOutlet]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERPENTERPRISE';
}