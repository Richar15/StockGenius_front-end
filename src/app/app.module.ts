import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from '../components/start/start.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { ProductsComponent } from '../components/products/products.component';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { MenucomComponent } from '../components/menucom/menucom.component';
import { QuotationComponent } from '../components/quotation/quotation.component';
import { ContactComponent } from '../components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { ClientListComponent } from '../components/client-list/client-list.component';
import { SalesComponent } from '../components/sales/sales.component';
import { VistaInicioComponent } from '../components/vista-inicio/vista-inicio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    RegeneratePasswordComponentComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductImageUploadComponent,
    EditProductComponent,
    MenucomComponent,
    QuotationComponent,
    ContactComponent,
    ClientListComponent,
    CreateClientComponent,
    EditClientComponent,
    SalesComponent,
    VistaInicioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideAnimationsAsync()

  ],
 
  bootstrap: [AppComponent],
})
export class AppModule { }
