import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ExampleComponent } from '../components/example/example.component';
import { StartComponent } from '../components/start/start.component';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';

const routes: Routes = [
  { path: 'start', component: StartComponent }, // Ruta al StartComponent
  { path: 'login', component: LoginComponent }, // Ruta al LoginComponent
  { path: 'example', component: ExampleComponent }, // Ruta al ExampleComponent después del login
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'regenerate-password',
    component: RegeneratePasswordComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
