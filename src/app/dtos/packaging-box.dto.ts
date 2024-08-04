export class PackagingBoxDto{
  id: number;
  line_id: number;
  to_be_delivered_quantity: number;
  delivered_quantity: number;
  harness_id: number;
  status: number;
  created_by: string;
  barcode:string;




  constructor(data: any) {
    this.id = data.id;
    this.line_id = data.line_id;
    this.to_be_delivered_quantity = data.to_be_delivered_quantity;
    this.delivered_quantity = data.delivered_quantity;
    this.harness_id = data.harness_id;
    this.status = data.status;
    this.created_by = data.created_by;
    this.barcode = data.barcode;
  }
}
