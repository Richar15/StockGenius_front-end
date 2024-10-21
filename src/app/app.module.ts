import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from '../components/start/start.component';

//Imports producto -- por Fabian
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductImageUploadComponent } from '../components/product-image-upload/product-image-upload.component';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from '../components/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CreateProductComponent,
    ProductsComponent,
    ProductImageUploadComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Fabian
    FormsModule, //Fabian
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
