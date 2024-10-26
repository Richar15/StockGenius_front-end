import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductEntity } from '../models/product-entity';

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
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          alert('Error al obtener el producto.');
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
      alert('Los valores de price y amount no pueden ser negativos.');
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
            alert('Producto actualizado exitosamente.');
            this.router.navigate(['/products']);
          }
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          alert('Error al actualizar el producto.');
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
          alert('Producto e imagen actualizados exitosamente.');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error al actualizar la imagen:', error);
          alert('Error al actualizar la imagen.');
        },
      });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
