import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    image: null, // Inicializa la propiedad image como null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.productId = +this.route.snapshot.paramMap.get('id')!; // Obtiene el ID del producto de la URL
  }

  ngOnInit(): void {
    this.getProduct(); // Llama a la función para obtener el producto
  }

  getProduct() {
    this.http
      .get<ProductEntity>(`http://localhost:8081/products/${this.productId}`)
      .subscribe({
        next: (data) => {
          this.product = data; // Asigna los datos del producto
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          alert('Error al obtener el producto.'); // Agrega mensaje de error
        },
      });
  }

  updateProduct() {
    // Verifica que price y amount no sean negativos
    if (this.product.price < 0 || this.product.amount < 0) {
      alert('Los valores de price y amount no pueden ser negativos.');
      return;
    }

    // Crea un objeto JSON para actualizar el producto
    const updatedProduct = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      amount: this.product.amount,
      // Puedes agregar image si es necesario
    };

    // Actualiza el producto
    this.http
      .put<ProductEntity>(
        `http://localhost:8081/products/updateProduct/${this.productId}`,
        updatedProduct
      )
      .subscribe({
        next: () => {
          alert('Producto actualizado exitosamente.');
          this.router.navigate(['/products']); // Redirige a la lista de productos después de la actualización
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          alert('Error al actualizar el producto.'); // Agrega mensaje de error
        },
      });
  }

  cancel() {
    this.router.navigate(['/products']); // Navega de regreso a la lista de productos
  }
}
