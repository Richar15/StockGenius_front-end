import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    price: null,
    amount: null,
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Validación de campos vacíos
    if (
      !this.product.name ||
      !this.product.description ||
      this.product.price === null ||
      this.product.amount === null
    ) {
      this.errorMessage = 'Por favor, llene todos los campos';
      this.successMessage = null;
      return;
    }

    // Validación de precios y cantidades
    if (this.product.price <= 0 || this.product.amount <= 0) {
      this.errorMessage = 'El precio y la cantidad deben ser mayores a 0';
      return;
    }

    this.http
      .post('http://localhost:8081/products/createProduct', this.product)
      .subscribe(
        (response: any) => {
          console.log('Producto creado', response);
          this.successMessage = 'Producto creado exitosamente';
          this.errorMessage = null;

          // Limpiar los campos del formulario
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el producto', error);
          this.errorMessage = 'Hubo un error al crear el producto';
          this.successMessage = null;
        }
      );
  }

  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: null,
      amount: null,
    };
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
