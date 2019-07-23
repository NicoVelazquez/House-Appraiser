import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeInfoComponent} from './home-info/home-info.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'house-information', component: HomeInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
