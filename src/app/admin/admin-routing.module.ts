import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminIndexComponent} from "./admin-index/admin-index.component";
import {AdminProjectComponent} from "./admin-project/admin-project.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminHarnessComponent} from "./admin-harness/admin-harness.component";
import {AdminJobGoalsComponent} from "./admin-job-goals/admin-job-goals.component";
import {ProductionLinesComponent} from "./production-lines/production-lines.component";
import {ProductionHarnessComponent} from "./production-harness/production-harness.component";

const routes: Routes = [
  {path: '',component: AdminIndexComponent,
  children:[
    {path: 'projects',component: AdminProjectComponent},
    {path: 'users',component: AdminUsersComponent},
    {path: 'harness',component: AdminHarnessComponent},
    {path: 'job-goals',component: AdminJobGoalsComponent},
    {path: 'production-lines',component: ProductionLinesComponent},
    {path: 'production-harness',component: ProductionHarnessComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
