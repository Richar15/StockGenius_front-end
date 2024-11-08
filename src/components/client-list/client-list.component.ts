import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.http.get('http://localhost:8081/clients/listOfClients').subscribe(
      (response: any) => {
        this.clients = response;
      },
      () => {
        console.error('No se pudieron cargar los clientes');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los clientes.',
          confirmButtonColor: '#c82333',
        });
      }
    );
  }

  searchClients(): void {
    if (!this.searchTerm) {
      this.fetchClients();
      return;
    }
    this.http
      .get(`http://localhost:8081/clients/searchClient/${this.searchTerm}`)
      .subscribe(
        (response: any) => {
          this.clients = response;
        },
        () => {
          console.error('No se pudo realizar la búsqueda');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo realizar la búsqueda.',
            confirmButtonColor: '#c82333',
          });
        }
      );
  }

  confirmDeleteClient(name: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al cliente "${name}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient(name);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: `El cliente "${name}" ha sido eliminado.`,
          confirmButtonColor: '#28a745',
        });
      }
    });
  }

  deleteClient(name: string) {
    this.http
      .delete(`http://localhost:8081/clients/deleteClient/${name}`)
      .subscribe(
        () => {
          this.fetchClients(); 
        },
        () => {
          console.error('Ocurrió un error al intentar eliminar el cliente.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar eliminar el cliente.',
            confirmButtonColor: '#c82333',
          });
        }
      );
  }

  navigateToCreateClient() {
    this.router.navigate(['/create-client']);
  }

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }

  navigateToEditClient(clientId: number) {
    this.router.navigate(['/edit-client', clientId]);
  }
}