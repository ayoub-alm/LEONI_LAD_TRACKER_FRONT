import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-packaging-index',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './packaging-index.component.html',
  styleUrl: './packaging-index.component.css'
})
export class PackagingIndexComponent {

  constructor(private router: Router){}
logout() {
 localStorage.removeItem("user")
 localStorage.removeItem("token")
 this.router.navigateByUrl("/login")
}

}
