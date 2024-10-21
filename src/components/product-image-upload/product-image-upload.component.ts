import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-image-upload',
  templateUrl: './product-image-upload.component.html',
  styleUrls: ['./product-image-upload.component.css'],
})
export class ProductImageUploadComponent implements OnInit {
  products: any[] = [];
  selectedProductId: number | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Llamar al backend para obtener la lista de productos
    this.http.get('http://localhost:8081/products/listOfProducts').subscribe(
      (response: any) => {
        this.products = response;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  uploadImage(): void {
    if (this.selectedProductId && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http
        .post(
          `http://localhost:8081/products/${this.selectedProductId}/image`,
          formData
        )
        .subscribe(
          (response) => {
            console.log('Imagen subida con éxito:', response);
            // Opcional: Redirige a la lista de productos o muestra un mensaje
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
          }
        );
    } else {
      console.error('Debes seleccionar un producto y una imagen.');
    }
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
}
