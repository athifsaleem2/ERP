import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: Product = {
    sku: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    taxRate: 0,
    stockQuantity: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  saveProduct(): void {
    if (!this.product.name || !this.product.sku || this.product.price <= 0) {
      alert('Name, SKU and a valid Price are required!');
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: (res) => {
        alert('Product saved successfully!');
        this.router.navigate(['/dashboard/products']);
      },
      error: (err) => {
        alert('Error saving product: ' + (err.error?.message || err.message));
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/products']);
  }
}
