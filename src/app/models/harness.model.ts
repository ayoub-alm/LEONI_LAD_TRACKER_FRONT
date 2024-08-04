import {ProjectModel} from "./project.model";
import {PackagingType} from "./packaging.type.model";

export class HarnessModel {
  id: number;
  ref: string;
  fuse_box: string;
  family: string;
  range_time: number;
  project_id: number;
  project: ProjectModel;
  package: PackagingType;


  constructor(data: any) {
    this.id = data.id;
    this.ref = data.ref;
    this.fuse_box = data.fuse_box;
    this.family = data.family;
    this.range_time = data.range_time;
    this.project_id = data.project_id;
    this.project = data.project;
    this.package = data.package;
  }
}
