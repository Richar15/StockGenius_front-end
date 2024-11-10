import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Seccion {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
  color: string;
  
}
@Component({
  selector: 'app-vista-inicio',
  templateUrl: './vista-inicio.component.html',
  styleUrl: './vista-inicio.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class VistaInicioComponent {
  secciones: Seccion[] = [
    {
      titulo: 'Vender',
      descripcion: 'Crea y registra tus ventas de manera rápida y eficiente',
      icono: 'shopping_cart',
      ruta: '/menu',
      color: '#4CAF50'
    },
    {
      titulo: 'Productos',
      descripcion: 'Gestiona tu catálogo de productos con facilidad',
      icono: 'inventory_2',
      ruta: '/products',
      color: '#2196F3'
    },
    {
      titulo: 'Reporte de Ventas',
      descripcion: 'Analiza tus ventas con informes detallados',
      icono: 'bar_chart',
      ruta: '/sales',
      color: '#FF9800'
    },
    {
      titulo: 'Clientes',
      descripcion: 'Administra tu base de clientes y mejora tus relaciones comerciales',
      icono: 'people',
      ruta: '/clients',
      color: '#E91E63'
    },
    {
      titulo: 'Cotizaciones',
      descripcion: 'Crea cotizaciones para tus clientes potenciales',
      icono: 'request_quote',
      ruta: '/quotations',
      color: '#9C27B0'
    },
    {
      titulo: 'Soporte Técnico',
      descripcion: 'Obtén ayuda de nuestro equipo de expertos en cualquier momento',
      icono: 'support_agent',
      ruta: '/contact',
      color: '#607D8B'
    }
  ];

  caracteristicas: string[] = [
    'Optimiza tu gestión de inventario en tiempo real',
    'Mejora la satisfacción del cliente con un servicio más rápido y eficiente',
    'Ahorra tiempo y reduce errores en tus procesos diarios'
  ];

  constructor(private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
}
