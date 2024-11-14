import { Component } from '@angular/core';
import { ResetPasswordServiceService } from '../../service/reset-password-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-regenerate-password-component',
  templateUrl: './regenerate-password-component.component.html',
  styleUrl: './regenerate-password-component.component.css'
})
export class RegeneratePasswordComponentComponent {
  newPassword: string | null = null;
  passwordCopied: boolean = false;
  lastRegenerationTime: number | null = null;

  constructor(
    private resetPasswordService: ResetPasswordServiceService,
    private router: Router
  ) {
   
    this.lastRegenerationTime = Number(localStorage.getItem('lastRegenerationTime'));

    
    if (this.lastRegenerationTime && Date.now() - this.lastRegenerationTime <  3600000) {
  Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe esperar 1 hora para regenerar la contraseña nuevamente.'
      }).then(() => {
        this.router.navigate(['/start']);
      });
    }
  }

  regeneratePassword() {
   
    if (this.lastRegenerationTime && Date.now() - this.lastRegenerationTime < 3600000) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe esperar 1 hora para regenerar la contraseña.'
      });
      return;
    }

    
    this.resetPasswordService.regeneratePassword().subscribe({
      next: (response: string) => {
        this.newPassword = response;
        this.passwordCopied = false;
       
        localStorage.setItem('lastRegenerationTime', Date.now().toString());
        this.lastRegenerationTime = Date.now();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al regenerar la contraseña'
        });
      }
    });
  }

  copyPassword() {
    if (this.newPassword) {
      navigator.clipboard.writeText(this.newPassword).then(() => {
        this.passwordCopied = true;
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al copiar la contraseña'
        });
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
