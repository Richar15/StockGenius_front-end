import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClientEntity } from '../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {
  clientId: number;
  client: ClientEntity = { name: '', lastName: '', phone: '', direction: '' };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getClient(); 
  }

  getClient() {
    this.http
      .get<ClientEntity>(`http://localhost:8081/clients/${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.client = data; 
        },
        error: (error) => {
          console.error('Error al obtener el cliente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la información del cliente.',
            confirmButtonColor: '#c82333',
          });
        },
      });
  }

  updateClient() {
    this.http
      .put<ClientEntity>(
        `http://localhost:8081/clients/updateClient/${this.clientId}`,
        this.client
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'El cliente ha sido actualizado exitosamente.',
            confirmButtonColor: '#28a745',
          }).then(() => {
            this.router.navigate(['/clients']);
          });
        },
        error: (error) => {
          console.error('Error al actualizar el cliente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el cliente.',
            confirmButtonColor: '#c82333',
          });
        },
      });
  }

  Oncancel() {
    this.router.navigate(['/clients']);
  }
}
