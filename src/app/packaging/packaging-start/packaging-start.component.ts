import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-packaging-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packaging-start.component.html',
  styleUrl: './packaging-start.component.css'
})
export class PackagingStartComponent {
  isAdmin = this.authService.currentUserRole;

  constructor(private router: Router, private authService: AuthServiceService){}
}
