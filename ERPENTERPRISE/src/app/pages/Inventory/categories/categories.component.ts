import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../../core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category = { name: '', description: '' };
  categories: Category[] = [];
  
  isLoading = false;
  isSaving = false;
  isBrowser: boolean;

  constructor(
    private categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.isLoading = false;
      }
    });
  }

  addCategory() {
    if (!this.category.name || !this.category.description) return;

    this.isSaving = true;
    this.categoryService.createCategory(this.category).subscribe({
      next: (newCat) => {
        this.categories.push(newCat);
        this.category = { name: '', description: '' };
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error creating category', err);
        this.isSaving = false;
      }
    });
  }

  deleteCategory(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== id);
      });
    }
  }
}