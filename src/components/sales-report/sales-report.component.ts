import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent {
  report = {
    date: '',
    type: 'day' // 'day' | 'week' | 'month'
  };

  sales: any[] = [];
  message: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  generateReport() {
    if (!this.report.date) {
      this.errorMessage = 'Por favor, seleccione una fecha';
      this.successMessage = null;
      return;
    }

    this.loading = true;
    const params = { date: this.report.date };
    const endpoint = `http://localhost:8081/sales/getSaleBy${this.report.type}`;

    this.http.get<any>(endpoint, { params }).subscribe({
      next: (response) => {
        this.sales = response.sales;
        this.message = response.message;
        this.successMessage = 'Reporte generado exitosamente';
        this.errorMessage = null;
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error al obtener reporte:`, error);
        this.errorMessage = 'Error al generar el reporte';
        this.successMessage = null;
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.report = {
      date: '',
      type: 'day'
    };
    this.sales = [];
    this.message = '';
  }

  onCancel() {
    this.router.navigate(['/sales']);
  }
}