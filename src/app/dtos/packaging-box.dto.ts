export class PackagingBoxDto{

  ref: string;
  quantity: number;
  harness_id: number;
  status: string;
  created_by: string;
  barcode:string;

  constructor(data: any) {
    this.ref = data.ref;
    this.quantity = data.quantity;
    this.harness_id = data.harness_id;
    this.status = data.status;
    this.created_by = data.created_by;
    this.barcode = data.barcode;
  }
}
