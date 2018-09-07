import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ExtrasComponent } from './components/extras/extras.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'extras/:reservation',
    component: ExtrasComponent
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
