import { Component, OnInit } from "@angular/core";
import { Client } from "../../model/Client";
import { Product } from "../../model/Product";
import { Sale } from "../../model/Sale";
import { SaleService } from "../../service/sale.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";


@Component({
  selector: 'app-menucom',
  templateUrl: './menucom.component.html',
  styleUrls: ['./menucom.component.css']
})
export class MenucomComponent implements OnInit  {
 
  products: Product[] = [];
  selectedProducts: { product: Product; quantity: number }[] = [];
  clients: Client[] = [];
  selectedClient: Client | null = null;
  newClient: Client = { id: undefined, name: '', lastName: '', phone: '', direction: '', gmail: '' };
  showClientForm = false;
  sale: Sale = { id: null, date: '', priceTotal: 0, totalAmount: 0, products: [], client: null, clientName: '', productName: '' };

  constructor(private saleService: SaleService, private router: Router) {}

  ngOnInit(): void {}

  searchProducts(name: string): void {
    this.saleService.searchProductsByName(name).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        // Muestra un error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar productos',
          text: 'No se pudieron encontrar los productos. Por favor, intenta de nuevo.',
        });
      }
    );
  }

  selectProduct(product: Product, quantity: number): void {
    const existingProduct = this.selectedProducts.find((p) => p.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.selectedProducts.push({ product, quantity });
    }
    this.updateTotal();
  }

  searchClients(name: string): void {
    this.saleService.searchClientsByName(name).subscribe(
      (data) => {
        this.clients = data;
        this.showClientForm = data.length === 0; // Muestra el formulario si no se encuentran clientes
      },
      (error) => {
        // Muestra un error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar clientes',
          text: 'No se pudieron encontrar los clientes. Por favor, intenta de nuevo.',
        });
      }
    );
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.sale.client = client;
  }

  updateTotal(): void {
    this.sale.priceTotal = this.selectedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.sale.totalAmount = this.selectedProducts.reduce((total, item) => total + item.quantity, 0);
    this.sale.products = this.selectedProducts.map((item) => ({ ...item.product, amount: item.quantity }));
  }

  completeSale(): void {
    if (!this.selectedClient) {
      // Muestra un error si no hay cliente seleccionado
      Swal.fire({
        icon: 'warning',
        title: 'Cliente no seleccionado',
        text: 'Debe seleccionar un cliente antes de realizar la compra.',
      });
      return;
    }
    this.sale.date = new Date().toISOString().split('T')[0];
    this.saleService.createSale(this.sale).subscribe(
      (pdfBlob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Venta_${this.sale.id}.pdf`;
        link.click();
      },
      (error) => {
        // Muestra un error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al generar la venta',
          text: 'No se pudo generar la venta. Por favor, intenta de nuevo.',
        });
      }
    );
  }
  back(): void {
    this.router.navigate(['/inicio']);
  }
}