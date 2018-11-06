import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarrentalServiceService } from './services/carrental-service.service';
import { SearchComponent } from './components/search/search.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ExtrasComponent,
    CustomerDetailsComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CarrentalServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
