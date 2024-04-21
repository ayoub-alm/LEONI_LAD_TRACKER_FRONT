import { Component } from '@angular/core';

@Component({
  selector: 'app-picker-scanne',
  standalone: true,
  imports: [],
  templateUrl: './picker-scanne.component.html',
  styleUrl: './picker-scanne.component.css'
})
export class PickerScanneComponent {

  onScan() {
    alert('scaned');
  }
}
