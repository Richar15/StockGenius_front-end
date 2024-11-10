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
    id:'',
    name: '',
    lastName: '',
    phone: '',
    direction: '',
    gmail: ''
  };

  constructor(private http: HttpClient, private router: Router) { }
 
  onSubmit() {
  
    if (!this.client.name || !this.client.lastName || !this.client.phone || !this.client.direction || !this.client.gmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llene todos los campos',
        confirmButtonColor: '#ffc107',
      });
      return;
    }
    const phonePattern = /^3\d{9}$/; // Empieza con '3' y 9 cifras adicionales
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
  formatPhone() {
    if (this.client.phone) {
      // Asegurarse de que el número empieza con 3 y tenga 10 cifras
      this.client.phone = this.client.phone.replace(/[^\d]/g, ''); // Elimina cualquier carácter no numérico
      if (this.client.phone.length > 10) {
        this.client.phone = this.client.phone.substring(0, 10); // Limita a 10 dígitos
      }
      if (this.client.phone.length === 10 && this.client.phone.charAt(0) !== '3') {
        this.client.phone = ''; // Limpiar si no empieza con 3
      }
    }
  }
  resetForm() {
    this.client = {
      id:'',
      name: '',
      lastName: '',
      phone: '',
      direction: '',
      gmail: ''
    };
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
