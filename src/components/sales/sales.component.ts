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
    private router: Router,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.currentDate = this.formatDateToLocal(today);
  }

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = this.formatDateToLocal(today);

    this.salesForm = this.fb.group({
      date: [formattedDate]
    });

    this.getSalesByDay(formattedDate);
  }

  private formatDateToLocal(date: Date): string {
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
    console.log('Response received:', response);
    this.sales = response.sales || [];
    
  
    const totals = {
        day: response['Las ventas Generadas  hoy Han Sido de: '],
        week: response['Las ventas Generadas en esta Semana han Sido de: '],
        month: response['Las ventas Generadas de este mes han Sido de: ']
    };

    
    let total = totals[this.selectedPeriod];
    
   
    if (total === undefined || total === null) {
        total = this.sales.reduce((sum, sale) => {
          
            if (!sale || !sale.priceTotal) {
                return sum;
            }
            
            try {
              
                const cleanTotal = sale.priceTotal.toString().replace(/[^0-9.-]+/g, '');
                const numericTotal = parseFloat(cleanTotal) || 0;
                return sum + numericTotal;
            } catch (error) {
                console.error('Error al procesar el total de la venta:', sale);
                return sum;
            }
        }, 0);
    }

    this.totalAmount = total || 0;
    this.message = response.message || '';
    
    console.log('Period:', this.selectedPeriod);
    console.log('Total amount:', this.totalAmount);
    console.log('Sales:', this.sales); 
}

  getSalesByDay(date: string) {
    this.loading = true;
    this.selectedPeriod = 'day';
    this.http.get<SaleResponse>(`http://localhost:8081/sales/getSaleByday?date=${date}`)
      .subscribe({
        next: (response) => this.updateSalesData(response),
        error: () => {
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