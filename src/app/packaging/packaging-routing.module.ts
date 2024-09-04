import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PackagingIndexComponent} from "./packaging-index/packaging-index.component";
import {PackagingScanComponent} from "./packaging-scan/packaging-scan.component";
import { LineDisplayComponent } from './line-display/line-display.component';
import { PackagingStartComponent } from './packaging-start/packaging-start.component';
import { PackagingSettingsComponent } from './packaging-settings/packaging-settings.component';
import { PackagingDataComponent } from './packaging-data/packaging-data.component';
import { PackagingProcessCreateComponent } from './packaging-process-create/packaging-process-create.component';


const routes: Routes = [
  {path: '', component: PackagingIndexComponent,children:[
      {path:'scan', component: PackagingScanComponent},
      {path:'start', component: PackagingStartComponent},
      {path:'report', component: LineDisplayComponent},
      {path:'settings', component: PackagingSettingsComponent},
      {path:'data', component: PackagingDataComponent},
      {path:'create-process', component: PackagingProcessCreateComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagingRoutingModule { }
