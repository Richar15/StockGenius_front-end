import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sale } from '../models/sale.interface';
import { SaleResponse } from '../models/sale.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesForm!: FormGroup;
  sales: Sale[] = [];
  totalAmount: number = 0;
  message: string = '';
  loading: boolean = false;
  selectedPeriod: 'day' | 'week' | 'month' = 'day';
  expandedSaleId: number | null = null;
  currentDate: string;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // Crear la fecha actual en la zona horaria local en formato YYYY-MM-DD
    const today = new Date();
    this.currentDate = this.formatDateToLocal(today);
  }

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = this.formatDateToLocal(today);
    
    this.salesForm.patchValue({
      date: formattedDate
    });
    this.getSalesByDay(formattedDate);
  }

  private formatDateToLocal(date: Date): string {
    // Formatea la fecha actual en YYYY-MM-DD teniendo en cuenta la zona horaria local
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().split('T')[0];
  }

  getImageUrl(base64String: string | null): SafeUrl {
    if (!base64String) {
      return 'assets/placeholder-image.png';
    }
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
  }


  private updateSalesData(response: SaleResponse) {
    this.sales = response.sales;
    if (this.selectedPeriod === 'day') {
      this.totalAmount = response['Las ventas Generadas  hoy Han Sido de: '] || 0;
    } else if (this.selectedPeriod === 'week') {
      this.totalAmount = response['Las ventas Generadas en esta Semana han Sido de: '] || 0;
    } else {
      this.totalAmount = response['Las ventas Generadas de este mes han Sido de: '] || 0;
    }
    this.message = response.message || '';
  }

  getSalesByDay(date: string) {
    this.loading = true;
    this.selectedPeriod = 'day';
    this.http.get<SaleResponse>(`http://localhost:8081/sales/getSaleByday?date=${date}`)
      .subscribe({
        next: (response) => this.updateSalesData(response),
        error: () => {
          console.error('Error al cargar las ventas diarias');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las ventas diarias.',
            confirmButtonColor: '#c82333',
          });
        },
        complete: () => this.loading = false
      });
  }

  getSalesByWeek(date: string) {
    this.loading = true;
    this.selectedPeriod = 'week';
    this.http.get<SaleResponse>(`http://localhost:8081/sales/getSaleByweek?date=${date}`)
      .subscribe({
        next: (response) => this.updateSalesData(response),
        error: () => {
          console.error('Error al cargar las ventas semanales');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las ventas semanales.',
            confirmButtonColor: '#c82333',
          });
        },
        complete: () => this.loading = false
      });
  }

  getSalesByMonth(date: string) {
    this.loading = true;
    this.selectedPeriod = 'month';
    this.http.get<SaleResponse>(`http://localhost:8081/sales/getSaleBymonth?date=${date}`)
      .subscribe({
        next: (response) => this.updateSalesData(response),
        error: () => {
          console.error('Error al cargar las ventas mensuales');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las ventas mensuales.',
            confirmButtonColor: '#c82333',
          });
        },
        complete: () => this.loading = false
      });
    }
  
  navigateToMenu() {
    this.router.navigate(['/menu']);
  }
}
