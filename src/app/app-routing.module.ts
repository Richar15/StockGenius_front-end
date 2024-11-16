
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { ProductsComponent } from '../components/products/products.component';
import { ClientListComponent } from '../components/client-list/client-list.component';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { StartComponent } from '../components/start/start.component';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { ContactComponent } from '../components/contact/contact.component';
import { QuotationComponent } from '../components/quotation/quotation.component';
import { MenucomComponent } from '../components/menucom/menucom.component';
import { SalesComponent } from '../components/sales/sales.component';
import { VistaInicioComponent } from '../components/vista-inicio/vista-inicio.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { authGuard } from '../security/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'start', component: StartComponent },
  { path: 'create-product', component: CreateProductComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [authGuard] },
  { path: 'upload-image', component: ProductImageUploadComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'regenerate-password', component: RegeneratePasswordComponentComponent},
  { path: 'menu', component: MenucomComponent, canActivate: [authGuard] },
  { path: 'quotations', component: QuotationComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: 'clients', component: ClientListComponent, canActivate: [authGuard] },
  { path: 'create-client', component: CreateClientComponent, canActivate: [authGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [authGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [authGuard] },
  { path: 'inicio', component: VistaInicioComponent, canActivate: [authGuard] },
  { path: 'notif', component: NotificationComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
