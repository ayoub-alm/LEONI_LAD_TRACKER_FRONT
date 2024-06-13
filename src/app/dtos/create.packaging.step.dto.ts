export class PackagingStepDTO {
  preFix: string;
  fieldId: number;
  status: number;
  description: string;
  packagingProcessId: number;
  img:string;
  order: number;
  name: string = "";
  next_step_on_success: number | undefined;
  next_step_on_failure: number | undefined;
  condition: boolean | undefined;

  constructor(data: Partial<PackagingStepDTO> = {}) {
    this.preFix = data.preFix ?? '';
    this.fieldId = data.fieldId ?? 0;
    this.status = data.status ?? 0;
    this.description = data.description ?? '';
    this.packagingProcessId = data.packagingProcessId ?? 0;
    this.img = data.img ?? "";
    this.order = data.order ?? 0;
    this.name = data.name ?? "";
    this.condition = data.condition ?? false;
    this.next_step_on_failure = data.next_step_on_failure ?? undefined;
    this.next_step_on_success = data.next_step_on_success ?? undefined;
  }
}
