import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PickerIndexComponent} from "./picker-index/picker-index.component";
import {PickerScanneComponent} from "./picker-scanne/picker-scanne.component";
import {PickerStartComponent} from "./picker-start/picker-start.component";

const routes: Routes = [
  {path: '', component: PickerIndexComponent,children:[
      {path:'scan', component: PickerScanneComponent},
      {path:'start', component: PickerStartComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickerRoutingModule { }
