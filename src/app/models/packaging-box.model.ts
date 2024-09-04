import {ProductionLineModel} from "./production.line.model";
import {ProductionHarnessModel} from "./production.harness.model";
import { HarnessModel } from "./harness.model";

export class PackagingBoxModel{
  id: number;
  line_id: string;
  to_be_delivered_quantity: number;
  delivered_quantity: number;
  harness_id: number;
  status: string;
  created_by: string;
  barcode:string;
  harness: HarnessModel
  line: ProductionLineModel;
  prod_harness: ProductionHarnessModel[];

  constructor(data: { id: number; line_id: string; to_be_delivered_quantity: number;  delivered_quantity: number; harness_id: number; status: string; created_by: string;
    barcode: string;line: ProductionLineModel, prod_harness: ProductionHarnessModel[]; harness: HarnessModel}) {
    this.id = data.id;
    this.line_id = data.line_id;
    this.to_be_delivered_quantity = data.to_be_delivered_quantity;
    this.delivered_quantity = data.delivered_quantity;
    this.harness_id = data.harness_id;
    this.status = data.status;
    this.created_by = data.created_by;
    this.barcode = data.barcode;
    this.line = data.line;
    this.prod_harness = data.prod_harness
    this.harness = data.harness
  }

}
