import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AdminIndexComponent} from "./admin/admin-index/admin-index.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  providers:[LoginComponent],
  imports: [RouterOutlet, AdminIndexComponent , ReactiveFormsModule, HttpClientModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LAD_TRAKER';
}
