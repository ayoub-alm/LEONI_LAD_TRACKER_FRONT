import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatIcon, MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatIconModule
  ]
})
export class AdminModule { }
