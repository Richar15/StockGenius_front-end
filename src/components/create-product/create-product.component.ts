import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    amount: 0,
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http
      .post('http://localhost:8081/products/createProduct', this.product)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: 'Producto creado con éxito.',
            confirmButtonColor: '#218838',
          });
          this.router.navigate(['/products']);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el producto.',
            confirmButtonColor: '#c82333',
          });
        },
      });
  }

  onCancel() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No se guardarán los cambios.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar',
      confirmButtonColor: '#c82333',
      cancelButtonColor: '#218838',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/products']);
      }
    });
  }
}
