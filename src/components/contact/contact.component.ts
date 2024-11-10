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
        github: 'https://github.com/Antonio0686',
        linkedin: 'https://www.linkedin.com/in/antonio-daza-554a641a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        
      }
    },
    {
      name: 'Fabian Ricardo Espinosa Pastrana',
      role: 'Full-Stack Developer y Diseñador ui/ux',
      socialMedia: {
        github: 'https://github.com/thefabobian',
        linkedin: 'https://www.linkedin.com/in/fabian-espinosa-a38154261',
        
      }
    },
    {
      name: 'Hendepson Gonzáles Jiménez',
      role: 'Frontend Developer',
      socialMedia: {
        github: 'https://github.com/Henderson0126',
        linkedin: 'https://www.linkedin.com/in/henderson-gonz%C3%A1lez-426b15327?trk=contact-info',
        
      }
    },
    {
      name: 'Maykol Manuel Galván Hoyos',
      role: 'Frontend Developer',
      socialMedia: {
        github: 'https://github.com/ingeniero44',
        linkedin: 'https://www.linkedin.com/in/maykol-galvan-hoyos-85558b209/',
        
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
