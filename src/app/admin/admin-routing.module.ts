import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminIndexComponent} from "./admin-index/admin-index.component";
import {AdminProjectComponent} from "./admin-project/admin-project.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminHarnessComponent} from "./admin-harness/admin-harness.component";
import {AdminJobGoalsComponent} from "./admin-job-goals/admin-job-goals.component";
import {ProductionLinesComponent} from "./production-lines/production-lines.component";
import {ProductionHarnessComponent} from "./production-harness/production-harness.component";
import {AdminPackagingProcessComponent} from "./admin-packaging-process/admin-packaging-process.component";
import {
  AdminPackagingProcessCreateComponent
} from "./admin-packaging-process-create/admin-packaging-process-create.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminPackagesComponent} from "./admin-packages/admin-packages.component";
import {SupervisorDashboardComponent} from "./supervisor-dashboard/supervisor-dashboard.component";

const routes: Routes = [
  {path: '',component: AdminIndexComponent,
  children:[
    {path: 'projects',component: AdminProjectComponent},
    {path: 'users',component: AdminUsersComponent},
    {path: 'harness',component: AdminHarnessComponent},
    {path: 'job-goals',component: AdminJobGoalsComponent},
    {path: 'production-lines',component: ProductionLinesComponent},
    {path: 'production-harness',component: ProductionHarnessComponent},
    {path: 'Packaging-process',component: AdminPackagingProcessComponent},
    {path: 'Packaging-process-create',component: AdminPackagingProcessCreateComponent},
    {path: 'Packages',component: AdminPackagesComponent},
    {path: 'dashboard',component: AdminDashboardComponent},
    {path: 'supervisor-dashboard',component: SupervisorDashboardComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
