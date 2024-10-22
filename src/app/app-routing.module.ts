/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ExampleComponent } from '../components/example/example.component';
import { StartComponent } from '../components/start/start.component';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { ProductsComponent } from '../components/products/products.component';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'start', component: StartComponent }, // Ruta al StartComponent
  { path: 'login', component: LoginComponent }, // Ruta al LoginComponent
  { path: 'example', component: ExampleComponent }, // Ruta al ExampleComponent después del login
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'regenerate-password',
    component: RegeneratePasswordComponentComponent
  },
  { path: 'products', component: ProductsComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'product-image-upload', component: ProductImageUploadComponent },
  { path: 'edit-product', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { ExampleComponent } from '../components/example/example.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { ProductsComponent } from '../components/products/products.component';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { StartComponent } from '../components/start/start.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload-image', component: ProductImageUploadComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'regenerate-password',
    component: RegeneratePasswordComponentComponent,
  },
  { path: 'start', component: StartComponent }, // Ruta al StartComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
