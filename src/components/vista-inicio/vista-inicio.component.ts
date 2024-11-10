import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Seccion {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
}
@Component({
  selector: 'app-vista-inicio',
  templateUrl: './vista-inicio.component.html',
  styleUrl: './vista-inicio.component.css'
})
export class VistaInicioComponent {
  secciones: Seccion[] = [
    {
      titulo: 'Productos',
      descripcion: 'Gestiona tu catálogo de productos',
      icono: 'inventory_2',
      ruta: '/products'
    },
  
    {
      titulo: 'Vender',
      descripcion: 'Crea y registra tus ventas',
      icono: 'shopping_cart',
      ruta: '/menu'
    },
    {
      titulo: 'Reporte de Ventas',
      descripcion: 'Informes y estadísticas de ventas',
      icono: 'bar_chart',
      ruta: '/sales'
    },
    {
      titulo: 'Clientes',
      descripcion: 'Gestiona los clientes de tu negocio',
      icono: 'people',
      ruta: '/clients'
    },
    {
      titulo: 'Cotizaciones',
      descripcion: 'Crea cotizaciones para tus clientes',
      icono: 'request_quote',
      ruta: '/quotations'
    },
    {
      titulo: 'Contactos de desarrollador',
      descripcion: 'Contacta a nuestro equipo de desarrollo para soporte técnico',
      icono: 'people',
      ruta: '/contact'
    }
  ];

  constructor(private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
}
