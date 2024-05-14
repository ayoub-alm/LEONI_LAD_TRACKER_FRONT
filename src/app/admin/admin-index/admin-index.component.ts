import {Component, Inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent implements OnInit{
  elem: any;
  constructor(  @Inject(DOCUMENT) private document: any) {
  }
  ngOnInit(): void {
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
