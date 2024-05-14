import {Component, OnInit} from '@angular/core';
import {ProductionLineService} from "../../services/production.line.service";
import {BehaviorSubject} from "rxjs";
import {ProductionLineModel} from "../../models/production.line.model";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-production-lines',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './production-lines.component.html',
  styleUrl: './production-lines.component.css'
})
export class ProductionLinesComponent implements OnInit{
    productionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([])
    constructor(private productionLineService: ProductionLineService) {
    }

    ngOnInit() {
      this.productionLineService.getAll().subscribe(
        productionLines => this.productionLines.next(productionLines)
      )
    }
}
