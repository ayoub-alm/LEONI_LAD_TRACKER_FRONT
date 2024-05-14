import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AdminIndexComponent} from "./admin/admin-index/admin-index.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {CommonModule, DatePipe, DOCUMENT} from "@angular/common";



@Component({
  selector: 'app-root',
  standalone: true,
  providers:[LoginComponent,DatePipe ],
  imports: [RouterOutlet, AdminIndexComponent , ReactiveFormsModule, HttpClientModule,CommonModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LAD_TRAKER';
  elem: any;
  constructor(@Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    // this.toFullScreen();
  }

  /**
   * Listen to Enter Click
   * @param event
   */
  @HostListener('window:keydown.+',['$event'])

  toFullScreen(){
    this.elem = document.documentElement;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
}
