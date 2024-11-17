import { Component, OnInit } from "@angular/core";
import { Client } from "../../model/Client";
import { Product } from "../../model/Product";
import { Sale } from "../../model/Sale";
import { SaleService } from "../../service/sale.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";



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
 
  sale: Sale = { 
    id: null, 
    date: '', 
    priceTotal: 0, 
    totalAmount: 0, 
    products: [], 
    client: null, 
    clientName: '', 
    productName: '' 
  };

  constructor(
    private saleService: SaleService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  searchProducts(name: string): void {
    this.saleService.searchProductsByName(name).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
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

  

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.sale.client = client;
  }



  updateTotal(): void {
    this.sale.priceTotal = this.selectedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.sale.totalAmount = this.selectedProducts.reduce((total, item) => total + item.quantity, 0);
    this.sale.products = this.selectedProducts.map((item) => ({ ...item.product, amount: item.quantity }));
  }
  toggleClientForm(): void {
    this.showClientForm = !this.showClientForm;
    if (!this.showClientForm) {
    
      this.newClient = {
        id: undefined,
        name: '',
        lastName: '',
        phone: '',
        direction: '',
        gmail: ''
      };
    }
  }

  searchClients(name: string): void {
    this.saleService.searchClientsByName(name).subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar clientes',
          text: 'No se pudieron encontrar los clientes. Por favor, intenta de nuevo.',
        });
      }
    );
  }

  createClient(): void {
    this.saleService.createClient(this.newClient).subscribe(
      (response: Client) => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente Creado',
          text: 'El cliente ha sido registrado exitosamente.',
        });
        
        this.selectedClient = response;
        this.sale.client = response;
        this.showClientForm = false;
        
       
        this.clients = [response];
        
        this.newClient = {
          id: undefined,
          name: '',
          lastName: '',
          phone: '',
          direction: '',
          gmail: ''
        };
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cliente',
          text: 'No se pudo crear el cliente. Por favor, intenta de nuevo.',
        });
      }
    );
  }
  completeSale(): void {
    if (!this.selectedClient) {
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