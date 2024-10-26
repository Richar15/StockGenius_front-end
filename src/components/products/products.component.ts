import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductEntity } from '../models/product-entity'; // Asegúrate de importar tu interfaz

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductEntity[] = []; // Cambiar el tipo a ProductEntity
  searchTerm: string = '';
  selectedFile: File | null = null; // Para almacenar el archivo seleccionado

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
          console.error('No se pudieron cargar los productos');
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
              product.image = reader.result as string; // Asigna la URL de datos a la propiedad image
            };
            reader.readAsDataURL(blob); // Usa readAsDataURL para convertir el blob a una URL
          },
          () => {
            console.error(
              `Error al cargar la imagen para el producto ${product.name}`
            );
          }
        );
    }
  }

  onFileSelected(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0]; // Almacena el archivo seleccionado
    }
  }

  uploadImage(productId: number) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile); // Asegúrate de que el nombre coincida con el esperado por el backend

      this.http
        .post(`http://localhost:8081/products/${productId}/image`, formData)
        .subscribe(
          () => {
            alert('Imagen subida con éxito');
            this.fetchProducts(); // Refresca la lista después de subir la imagen
          },
          () => {
            console.error('Error al subir la imagen');
          }
        );
    } else {
      alert('Por favor, selecciona un archivo antes de subir.');
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
          console.error('No se pudo realizar la búsqueda');
        }
      );
  }

  confirmDeleteProduct(name: string) {
    if (
      confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`)
    ) {
      this.deleteProduct(name);
    }
  }

  deleteProduct(name: string) {
    this.http
      .delete(`http://localhost:8081/products/deleteProduct/${name}`)
      .subscribe(
        () => {
          this.fetchProducts(); // Refresca la lista después de eliminar
        },
        () => {
          console.error('Ocurrió un error al intentar eliminar el producto.');
        }
      );
  }

  navigateToCreateProduct() {
    this.router.navigate(['/create-product']);
  }

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }

  navigateToEditProduct(productId: number) {
    this.router.navigate(['/edit-product', productId]);
  }

  navigateToAddImage() {
    this.router.navigate(['/upload-image']); // Redirige a la ruta de subir imagen
  }
}
