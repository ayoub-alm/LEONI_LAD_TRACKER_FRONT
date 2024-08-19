import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PackagingIndexComponent} from "./packaging-index/packaging-index.component";
import {PackagingScanComponent} from "./packaging-scan/packaging-scan.component";
import { LineDisplayComponent } from './line-display/line-display.component';
import { PackagingStartComponent } from './packaging-start/packaging-start.component';
import { PackagingSettingsComponent } from './packaging-settings/packaging-settings.component';


const routes: Routes = [
  {path: '', component: PackagingIndexComponent,children:[
      {path:'scan', component: PackagingScanComponent},
      {path:'start', component: PackagingStartComponent},
      {path:'report', component: LineDisplayComponent},
      {path:'settings', component: PackagingSettingsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagingRoutingModule { }
