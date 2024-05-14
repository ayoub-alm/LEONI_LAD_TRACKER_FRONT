import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {ProductionHarnessModel} from "../../models/production.harness.model";
import {ProdHarnessService} from "../../services/prod-harness.service";

@Component({
  selector: 'app-production-harness',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './production-harness.component.html',
  styleUrl: './production-harness.component.css'
})
export class ProductionHarnessComponent implements OnInit{
  productionHarnesses: BehaviorSubject<ProductionHarnessModel[]> = new BehaviorSubject<ProductionHarnessModel[]>([]);

  constructor(private productionHarnessService: ProdHarnessService) {
  }

  ngOnInit() {
    this.productionHarnessService.getAllProdHarnesses().subscribe( value => {
        this.productionHarnesses.next(value)
      console.log(this.productionHarnesses.getValue());
    })
  }

}
