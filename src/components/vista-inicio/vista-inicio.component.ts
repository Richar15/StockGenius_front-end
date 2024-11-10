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
      descripcion: 'Controla los pedidos entrantes y salientes',
      icono: 'shopping_cart',
      ruta: '/menu'
    },
    {
      titulo: 'Reporte de Ventas',
      descripcion: 'Genera informes y estadísticas',
      icono: 'bar_chart',
      ruta: '/'
    },
    {
      titulo: 'Clientes',
      descripcion: 'Gestiona los usuarios del sistema',
      icono: 'people',
      ruta: '/usuarios'
    },
    {
      titulo: 'Configuración',
      descripcion: 'Ajusta la configuración del sistema',
      icono: 'settings',
      ruta: '/configuracion'
    }
  ];

  constructor(private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
}
