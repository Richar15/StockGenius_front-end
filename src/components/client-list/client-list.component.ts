import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
        }
      );
  }

  confirmDeleteClient(name: string) {
    if (
      confirm(`¿Estás seguro de que deseas eliminar el cliente "${name}"?`)
    ) {
      this.deleteClient(name);
    }
  }

  deleteClient(name: string) {
    this.http
      .delete(`http://localhost:8081/clients/deleteClient/${name}`)
      .subscribe(
        () => {
          this.fetchClients(); 
        },
        () => {
          console.error('Ocurrió un error al intentar eliminar el .');
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