export class PackagingBoxModel{
  id: number;
  line_id: string;
  quantity: number;
  harness_id: number;
  status: string;
  created_by: string;
  barcode:string;

  constructor(data: { id: number; line_id: string; quantity: number; harness_id: number; status: string; created_by: string; barcode: string; }) {
    this.id = data.id;
    this.line_id = data.line_id;
    this.quantity = data.quantity;
    this.harness_id = data.harness_id;
    this.status = data.status;
    this.created_by = data.created_by;
    this.barcode = data.barcode;
  }

}
