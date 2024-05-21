import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PickerIndexComponent} from "../picker/picker-index/picker-index.component";
import {PickerScanneComponent} from "../picker/picker-scanne/picker-scanne.component";
import {PickerStartComponent} from "../picker/picker-start/picker-start.component";
import {PackagingIndexComponent} from "./packaging-index/packaging-index.component";
import {PackagingScanComponent} from "./packaging-scan/packaging-scan.component";

const routes: Routes = [
  {path: '', component: PackagingIndexComponent,children:[
      {path:'scan', component: PackagingScanComponent},
      {path:'start', component: PickerStartComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagingRoutingModule { }
