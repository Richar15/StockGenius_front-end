import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  login() {
    this.authService.login(this.password).subscribe(
      response => {
        if (response === 'Login successful') {
          this.router.navigate(['/example']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Contraseña incorrecta'
          });
        }
      },
      error => {
        console.error('Error response:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseña incorrecta'
        });
      }
    );
  }

}

