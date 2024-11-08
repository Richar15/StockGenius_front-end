
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

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload-image', component: ProductImageUploadComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'regenerate-password', component: RegeneratePasswordComponentComponent },
  { path: 'start', component: StartComponent },
  { path: 'menu', component: MenucomComponent },
  {path: 'quotations', component: QuotationComponent},
  {path: 'contact', component: ContactComponent}, 
  { path: 'clients', component: ClientListComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'edit-client/:id', component: EditClientComponent },
  { path: 'sales', component: SalesComponent }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
