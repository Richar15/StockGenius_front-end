import { Component } from '@angular/core';
import { QuotationService } from '../../service/quotation.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})
export class QuotationComponent {
  searchName: string = '';
  searchResults: any[] = [];
  selectedProducts: any[] = [];

  constructor(private quotationService: QuotationService, private router: Router) {}

  searchProducts(): void {
    this.quotationService.searchProductsByName(this.searchName).subscribe(
      (products) => {
        this.searchResults = products;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar productos',
          text: 'No se pudo realizar la búsqueda. Inténtalo de nuevo más tarde.',
          confirmButtonColor: '#d33'
        });
      }
    );
  }

  addProductToQuotation(product: any): void {
    // Verificar si se especificó una cantidad válida
    const quantity = product.quantity || 1; // Asigna 1 como cantidad predeterminada si está vacío

    const productToAdd = { 
      ...product, 
      amount: quantity // Asigna la cantidad especificada
    };

    this.selectedProducts.push(productToAdd);
    product.quantity = 1; // Restablece la cantidad en el campo de entrada
  }

  generateQuotation(): void {
    this.quotationService.createQuotation(this.selectedProducts).subscribe(
      (pdfBlob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Cotizacion.pdf';
        a.click();
        window.URL.revokeObjectURL(url);

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al generar cotización',
          text: 'Hubo un problema al generar la cotización. Inténtalo de nuevo.',
          confirmButtonColor: '#d33'
        });
      }
    );
  }

  back(): void {
    this.router.navigate(['/menu']);
  }
}
