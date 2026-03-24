import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categoryName = '';
  description = '';

  categories: any[] = [];

  addCategory() {
    if (!this.categoryName) return;

    this.categories.push({
      name: this.categoryName,
      description: this.description
    });

    this.categoryName = '';
    this.description = '';
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }
}