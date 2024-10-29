import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Developer {
  name: string;
  role: string;
  socialMedia: {
    github: string;
    linkedin: string;
    
  };
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor( private router: Router) {}
  developers: Developer[] = [
    {
      name: 'Antonio Daza Franco',
      role: 'Frontend Developer',
      socialMedia: {
        github: 'https://github.com/anamartinez',
        linkedin: 'https://linkedin.com/in/anamartinez',
        
      }
    },
    {
      name: 'Fabian Ricardo Espinosa Pastrana',
      role: 'Full-Stack Developer y Diseñador ui/ux',
      socialMedia: {
        github: 'https://github.com/carlosrodriguez',
        linkedin: 'https://linkedin.com/in/carlosrodriguez',
        
      }
    },
    {
      name: 'Hendepson Gonzáles Jiménez',
      role: 'Frontend Developer',
      socialMedia: {
        github: 'https://github.com/elenagomez',
        linkedin: 'https://linkedin.com/in/elenagomez',
        
      }
    },
    {
      name: 'Maykol Manuel Galván Hoyos',
      role: 'Frontend Developer',
      socialMedia: {
        github: 'https://github.com/davidlopez',
        linkedin: 'https://linkedin.com/in/davidlopez',
        
      }
    },
    {
      name: 'Richard Antonio Assis Trujillo',
      role: 'Full-Stack Developer y Diseñador de Base de Datos' ,
      socialMedia: {
        github: 'https://github.com/Richar15',
        linkedin: 'https://www.linkedin.com/in/richardassistrujillo',
        
      }
    }
  ];
  back(): void {
    this.router.navigate(['/menu']);
  }
}
