import { PackagingStep } from "./packaging.step.model";
import { SegmentModul } from "./segment.model";

export class PackagingProcess {
  id: number;
  segmentId: number;
  segment: SegmentModul | null;
  status: number;
  name: string;
  steps: PackagingStep[];

  constructor(data: any) {
    this.id = data.id;
    this.segmentId = data.segment_id; 
    this.segment = data.segment
    this.status = data.status;
    this.name = data.name;
    this.steps = data.steps ? data.steps.map((step: any) => new PackagingStep(step)) : [];  // Safeguard against undefined steps
  }
}
