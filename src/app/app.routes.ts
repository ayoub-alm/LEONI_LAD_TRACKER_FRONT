import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LineChartsComponent} from "./line-charts/line-charts.component";


export const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)},
  {path:'picker', loadChildren: () => import('./picker/picker-routing.module').then(m => m.PickerRoutingModule)},
  {path:'packaging', loadChildren: () => import('./packaging/packaging-routing.module').then(m => m.PackagingRoutingModule)},
  {path:'line-dashboard', component:LineChartsComponent},
  {path:'**', component: LoginComponent},
];
