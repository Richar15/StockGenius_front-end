import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { ProductsComponent } from '../components/products/products.component';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { StartComponent } from '../components/start/start.component';
import { MenucomComponent } from '../components/menucom/menucom.component';
import { QuotationComponent } from '../components/quotation/quotation.component';
import { ContactComponent } from '../components/contact/contact.component';

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
  {path: 'contact', component: ContactComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
