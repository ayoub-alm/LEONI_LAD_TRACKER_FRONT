export class PackagingBoxDto{
  id: number | null;
  line_id: number;
  quantity: number;
  harness_id: number;
  status: string;
  created_by: string;
  barcode:string;


  constructor(data: any) {
    this.id = data.id || null;
    this.line_id = data.line_id;
    this.quantity = data.quantity;
    this.harness_id = data.harness_id;
    this.status = data.status;
    this.created_by = data.created_by;
    this.barcode = data.barcode;
  }
}
