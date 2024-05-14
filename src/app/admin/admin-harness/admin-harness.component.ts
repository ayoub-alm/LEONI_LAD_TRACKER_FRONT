import {Component, OnInit} from '@angular/core';
import {HarnessService} from "../../services/harness.service";
import {BehaviorSubject} from "rxjs";
import {HarnessModel} from "../../models/harness.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-admin-harness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-harness.component.html',
  styleUrl: './admin-harness.component.css'
})
export class AdminHarnessComponent implements OnInit{
  harnesses: BehaviorSubject<HarnessModel[]> = new BehaviorSubject<HarnessModel[]>([])

  constructor(private harnessServices: HarnessService) {
  }

  ngOnInit() {
    this.harnessServices.getAllHarnesses().subscribe(harnesses => {
      this.harnesses.next(harnesses)
    })
  }

}
