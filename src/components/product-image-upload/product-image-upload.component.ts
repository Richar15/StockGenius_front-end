import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importa SweetAlert2

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-image-upload',
  templateUrl: './product-image-upload.component.html',
  styleUrls: ['./product-image-upload.component.css'],
})
export class ProductImageUploadComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  private productsUrl = 'http://localhost:8081/products/listOfProducts';
  private uploadUrl = 'http://localhost:8081/products';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>(this.productsUrl).subscribe({
      next: (data) => (this.products = data),
      error: (error) => {
        // Reemplaza la alerta con SweetAlert2
        Swal.fire('Error', 'Error al cargar los productos.', 'error');
      },
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedImage = target.files[0];

      // Crear vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result !== undefined) {
          this.imagePreview = e.target.result;
        }
      };
    }
  }

  onSubmit(): void {
    if (!this.selectedProductId || !this.selectedImage) return;

    const formData = new FormData();
    formData.append('imageFile', this.selectedImage);

    this.http
      .post(`${this.uploadUrl}/${this.selectedProductId}/image`, formData)
      .subscribe({
        next: (response) => {
          // Reemplaza la alerta con SweetAlert2
          Swal.fire('Éxito', 'Imagen cargada exitosamente', 'success').then(
            () => {
              this.router.navigate(['/products']); // Redirige a la interfaz de productos
            }
          );
        },
        error: (error) => {
          // Reemplaza la alerta con SweetAlert2
          Swal.fire('Error', 'Hubo un problema al cargar la imagen', 'error');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/products']); // Redirige a la interfaz de productos
  }
}
