import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from '../components/start/start.component';
import { LoginComponent } from '../components/login/login.component';
import { ExampleComponent } from '../components/example/example.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { Toast, ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { RegeneratePasswordComponentComponent } from '../components/regenerate-password-component/regenerate-password-component.component';
import { ProductsComponent } from '../components/products/products.component';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { ClientListComponent } from '../components/client-list/client-list.component';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { SalesReportComponent } from '../components/sales-report/sales-report.component';




@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    ExampleComponent,
    RegeneratePasswordComponentComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductImageUploadComponent,
    EditProductComponent,
    ClientListComponent,
    CreateClientComponent,
    EditClientComponent,
    SalesReportComponent,


  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
