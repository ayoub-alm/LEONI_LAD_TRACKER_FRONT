export class PackagingStep {
  id: number;
  pre_fix: string;
  field_id: number;
  status: number;
  description: string;
  packagingProcessId: number;
  img: string;
  order: number;
  name: string;
  next_step_on_success: number | null;
  next_step_on_failure: number | null;
  condition: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.pre_fix = data.pre_fix;
    this.field_id = data.field_id;
    this.status = data.status;
    this.description = data.description;
    this.packagingProcessId = data.packagingProcessId;
    this.img = data.img;
    this.order = data.order;
    this.name = data.name || "";
    this.next_step_on_success = data.next_step_on_success || null;
    this.next_step_on_failure = data.next_step_on_failure || null;
    this.condition = data.condition || true;
  }
}
