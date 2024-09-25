import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {Router, RouterOutlet} from "@angular/router";
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packaging-index',
  standalone: true,
  imports: [RouterOutlet,MatIcon,CommonModule],
  templateUrl: './packaging-index.component.html',
  styleUrl: './packaging-index.component.css'
})
export class PackagingIndexComponent {
  isFullScreen = false;
  isAdmin = this.authService.currentUserRole;
  constructor(private router: Router, private authService: AuthServiceService){}


logout() {
 localStorage.removeItem("user")
 localStorage.removeItem("token")
 this.router.navigateByUrl("/login")
}


toggleFullScreen() {
  if (!this.isFullScreen) {
    this.openFullscreen();
  } else {
    this.closeFullscreen();
  }
  this.isFullScreen = !this.isFullScreen;
}

// Open the full-screen mode
openFullscreen() {
  const elem = document.documentElement; // Fullscreen the whole page
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.requestFullscreen) { /* Firefox */
    elem.requestFullscreen();
  } else if (elem.requestFullscreen) { /* Chrome, Safari and Opera */
    elem.requestFullscreen();
  } else if (elem.requestFullscreen) { /* IE/Edge */
    elem.requestFullscreen();
  }
}

// Close the full-screen mode
closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.exitFullscreen) { /* Chrome, Safari and Opera */
    document.exitFullscreen();
  } else if (document.exitFullscreen) { /* IE/Edge */
    document.exitFullscreen();
  }
}

}
