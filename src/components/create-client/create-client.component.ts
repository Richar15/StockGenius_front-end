import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  client = {
    name: '',
    lastName: '',
    phone: '',
    direction: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    // Validación de campos vacíos
    if (!this.client.name || !this.client.lastName || !this.client.phone || !this.client.direction) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llene todos los campos',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    // Solicitud HTTP para crear el cliente
    this.http
      .post('http://localhost:8081/clients/createClient', this.client)
      .subscribe({
        next: (response: any) => {
          console.log('Cliente creado', response);
          Swal.fire({
            icon: 'success',
            title: 'Cliente creado',
            text: 'Cliente creado exitosamente',
            confirmButtonColor: '#28a745',
          }).then(() => {
            this.resetForm();
            this.router.navigate(['/clients']);
          });
        },
        error: (error) => {
          console.error('Error al crear el cliente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el cliente. Inténtelo nuevamente.',
            confirmButtonColor: '#c82333',
          });
        }
      });
  }

  resetForm() {
    this.client = {
      name: '',
      lastName: '',
      phone: '',
      direction: ''
    };
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
