import { Component } from '@angular/core';
import { QuotationService } from '../../service/quotation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})
export class QuotationComponent {
  clientName: string = '';
  selectedClient: any;
  clientResults: any[] = [];
  selectedProducts: { name: string, amount: number }[] = [];
  productName: string = '';
  productAmount: number = 0;
  productResults: any[] = [];
  selectedProduct: any;

  constructor(private quotationService: QuotationService, private router: Router) {}


  searchClient(name: string) {

    if (name.trim() === '') {
      this.clientResults = [];
      return;
    }
    this.quotationService.searchClientsByName(name).subscribe(clients => {
      if (clients.length > 0) {
        this.clientResults = clients;
      } else {
        Swal.fire('Error', 'Ocurrió un error al buscar clientes.', 'error');
      }
    }, error => {
      Swal.fire('Cliente no encontrado', 'No se encontraron clientes que coincidan con su búsqueda.', 'warning');
    });
  }

  selectClient(client: any) {
    this.selectedClient = client;
    this.clientName = client.name;
    this.clientResults = [];
  }

  searchProduct(name: string) {

    if (name.trim() === '') {
      this.productResults = [];
      return;
    }

    this.quotationService.searchProductsByName(name).subscribe(products => {
      if (products.length > 0) {
        this.productResults = products;
      } else {
        Swal.fire('Error', 'Ocurrió un error al buscar productos.', 'error');
      }
    }, error => {
      Swal.fire('Producto no encontrado', 'No se encontraron productos que coincidan con su búsqueda.', 'warning');
    });
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.productName = product.name;
    this.productResults = [];
  }

  addProduct(amount: number) {
    if (this.selectedProduct) {
      this.selectedProducts.push({ name: this.selectedProduct.name, amount });
      this.selectedProduct = null;
      this.productName = '';
      this.productAmount = 0;
    }
  }

  createQuotation() {
    const quotationData = {
      clientName: this.clientName,
      selectedProducts: this.selectedProducts
    };

    this.quotationService.reateQuotation(quotationData).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      Swal.fire('Error', 'Ocurrió un error al crear la cotización.', 'error');
    });
  }

  back(): void {
    this.router.navigate(['/menu']);
  }
}
