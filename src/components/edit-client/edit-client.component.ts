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
  client: ClientEntity = { name: '', lastName: '', phone: '', direction: '', gmail: '' };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getClient(); 
  }
  formatPhone() {
    if (this.client.phone) {
      
      this.client.phone = this.client.phone.replace(/[^\d]/g, ''); 
      if (this.client.phone.length > 10) {
        this.client.phone = this.client.phone.substring(0, 10); 
      }
      if (this.client.phone.length === 10 && this.client.phone.charAt(0) !== '3') {
        this.client.phone = ''; 
      }
    }
  }
  getClient() {
    this.http
      .get<ClientEntity>(`http://localhost:8081/clients/client/${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.client = data;
        },
        error: (error) => {
          console.error('Error al obtener el cliente:', error);
      
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'No se pudo obtener la información del cliente.',
            confirmButtonColor: '#c82333',
          });
        },
      });
  }
  

  updateClient() {
 
    if (!this.client.name || !this.client.lastName || !this.client.phone || !this.client.direction || !this.client.gmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#c82333',
      });
      return;
    }
    const phonePattern = /^3\d{9}$/; 
    if (!phonePattern.test(this.client.phone)) {
      Swal.fire({
        icon: 'warning',
        title: 'Teléfono inválido',
        text: 'El número debe comenzar con 3 y tener 10 cifras.',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
 
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.client.gmail)) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingrese un correo electrónico válido',
        confirmButtonColor: '#ffc107',
      });
      return;
    }

    this.http
      .put<ClientEntity>(`http://localhost:8081/clients/updateClient/${this.clientId}`, this.client)
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
            text: 'No se pudo actualizar el cliente. Intenta nuevamente.',
            confirmButtonColor: '#c82333',
          });
        },
      });
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
