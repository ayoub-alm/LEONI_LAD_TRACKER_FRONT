import {PackagingStep} from "./packaging.step.model";

export class PackagingProcess {
  id: number;
  family: number;
  status: number;
  name: string;
  steps: PackagingStep[];

  constructor(data: any) {
    this.id = data.id;
    this.family = data.family;
    this.status = data.status;
    this.name = data.name;
    this.steps = data.steps.map((step: any) => new PackagingStep(step));
  }
}
