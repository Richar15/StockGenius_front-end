// menucom.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-menucom',
  templateUrl: './menucom.component.html',
  styleUrls: ['./menucom.component.css']
})
export class MenucomComponent {
  showProductDetails = false;
  selectedProduct = {
    name: 'Yuca',
    description: 'yuca fresca',
    price: 1600,
    quantity: 1
  };

  toggleProductDetails() {
    this.showProductDetails = !this.showProductDetails;
  }

  addToCart() {
    // Lógica para agregar al carrito
    console.log('Producto agregado:', this.selectedProduct);
    this.showProductDetails = false;
  }
}