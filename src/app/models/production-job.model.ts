import {ProjectModel} from "./project.model";
import {ProductionLineModel} from "./production.line.model";
import {HarnessModel} from "./harness.model";

export class ProductionJob {
  id: number;
  ref: string;
  production_line_id: number;
  harness_id: number;
  demanded_quantity: number;
  delivered_quantity: number;
  status: number;
  project: ProjectModel;
  production_line: ProductionLineModel;
  harness: HarnessModel;
  order: number;


  constructor(data: any) {
    this.id = data.id;
    this.ref = data.ref;
    this.production_line_id = data.production_line_id;
    this.harness_id = data.harness_id;
    this.demanded_quantity = data.demanded_quantity;
    this.delivered_quantity = data.delivered_quantity;
    this.status = data.status;
    this.project  = data.project;
    this.production_line = data.production_line
    this.harness = data.harness
    this.order = data.order
  }
}
