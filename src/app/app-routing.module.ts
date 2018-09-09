import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

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
