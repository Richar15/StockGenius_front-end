import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {

    if (
      !this.client.name ||
      !this.client.lastName ||
      !this.client.phone ||
      !this.client.direction
    ) {
      this.errorMessage = 'Por favor, llene todos los campos';
      this.successMessage = null;
      return;
    }

    this.http
      .post('http://localhost:8081/clients/createClient', this.client)
      .subscribe(
        (response: any) => {
          console.log('Cliente creado', response);
          this.successMessage = 'Cliente creado exitosamente';
          this.errorMessage = null;

          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el producto', error);
          this.errorMessage = 'Hubo un error al crear el cliente';
          this.successMessage = null;
        }
      );
  }

  resetForm() {
    this.client = {
      name: '',
      lastName: '',
      phone: '',
      direction: ''
    }
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
