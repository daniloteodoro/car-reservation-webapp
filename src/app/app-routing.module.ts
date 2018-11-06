import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'extras/:reservation',
    component: ExtrasComponent
  },
  {
    path: 'customer-details/:reservation',
    component: CustomerDetailsComponent
  },
  {
    path: 'order-confirmation/:ordernumber',
    component: OrderConfirmationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
