import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductEntity } from '../models/product-entity';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductEntity[] = [];
  searchTerm: string = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http
      .get<ProductEntity[]>('http://localhost:8081/products/listOfProducts')
      .subscribe(
        (response) => {
          this.products = response;
          this.loadProductImages();
        },
        () => {
          Swal.fire(
            'Error',
            'No existe ningún producto, por favor cree un producto',
            'error'
          );
        }
      );
  }

  loadProductImages(): void {
    for (const product of this.products) {
      this.http
        .get(`http://localhost:8081/products/${product.id}/image`, {
          responseType: 'blob',
        })
        .subscribe(
          (blob: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              product.image = reader.result as string;
            };
            reader.readAsDataURL(blob);
          },
          () => {
            Swal.fire(
              'Advertencia',
              `Por favor cargar la imagen para el producto ${product.name}`,
              'warning'
            );
          }
        );
    }
  }

  onFileSelected(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage(productId: number) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile);

      this.http
        .post(`http://localhost:8081/products/${productId}/image`, formData)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'Imagen subida con éxito', 'success');
            this.fetchProducts();
          },
          () => {
            Swal.fire('Error', 'Error al subir la imagen', 'error');
          }
        );
    } else {
      Swal.fire(
        'Advertencia',
        'Por favor, selecciona un archivo antes de subir.',
        'warning'
      );
    }
  }

  onSearch() {
    if (!this.searchTerm) {
      this.fetchProducts();
      return;
    }
    this.http
      .get<ProductEntity[]>(
        `http://localhost:8081/products/searchProduct/${this.searchTerm}`
      )
      .subscribe(
        (response) => {
          this.products = response;
          this.loadProductImages();
        },
        () => {
          Swal.fire('Error', 'No se pudo realizar la búsqueda', 'error');
        }
      );
  }

  deleteProduct(name: string) {
    this.http
      .delete<{ message: string }>(
        `http://localhost:8081/products/deleteProduct/${name}`
      ) // Asegúrate de que el backend devuelve un JSON
      .subscribe({
        next: (response) => {
          // Producto eliminado correctamente, actualiza la lista
          this.fetchProducts();
          // Mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Producto eliminado correctamente, refresque la página.', // Utiliza el mensaje devuelto por el servidor
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Producto eliminado correctamente, refresque la página.',
          });
        },
      });
  }

  confirmDeleteProduct(name: string) {
    // Cambia el método para que solo acepte el nombre
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el producto "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(name); // Elimina el producto usando el nombre
      }
    });
  }

  navigateToCreateProduct() {
    this.router.navigate(['/create-product']);
  }

  navigateToinicio() {
    this.router.navigate(['/menu']);
  }

  navigateToEditProduct(productId: number) {
    this.router.navigate(['/edit-product', productId]);
  }

  navigateToAddImage() {
    this.router.navigate(['/upload-image']);
  }
}
