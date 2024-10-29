import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductEntity } from '../models/product-entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: ProductEntity = {
    name: '',
    description: '',
    price: 0,
    amount: 0,
    image: null,
  };
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.http
      .get<ProductEntity>(`http://localhost:8081/products/${this.productId}`)
      .subscribe({
        next: (data) => {
          this.product = data;
          if (this.product.image) {
            // Obtener y mostrar la imagen actual
            this.http
              .get(`http://localhost:8081/products/${this.productId}/image`, {
                responseType: 'blob',
              })
              .subscribe((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                  this.imagePreview = reader.result;
                };
                reader.readAsDataURL(blob);
              });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar el producto',
          });
        },
      });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  updateProduct() {
    if (this.product.price < 0 || this.product.amount < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Valores inválidos',
        text: 'Los valores de precio y cantidad no pueden ser negativos.',
      });
      return;
    }

    const updatedProduct = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      amount: this.product.amount,
    };

    this.http
      .put<ProductEntity>(
        `http://localhost:8081/products/updateProduct/${this.productId}`,
        updatedProduct
      )
      .subscribe({
        next: () => {
          if (this.selectedImage) {
            this.uploadImage();
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Producto Actualizado',
              text: 'Producto actualizado exitosamente.',
            }).then(() => {
              this.router.navigate(['/products']);
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el producto.',
          });
        },
      });
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('imageFile', this.selectedImage!);

    this.http
      .put<ProductEntity>(
        `http://localhost:8081/products/${this.productId}/image`,
        formData
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Imagen Actualizada',
            text: 'Producto e imagen actualizados exitosamente.',
          }).then(() => {
            this.router.navigate(['/products']);
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar la imagen.',
          });
        },
      });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
