import {ProjectModel} from "./project.model";

export class ProductionLineModel{
  id: number;
  name: string;
  project_id: number;
  segment_id: number;
  project:string;
  number_of_operators: number;

  constructor(id: number, name: string, project_id: number, project:string,number_of_operators: number,segment_id: number) {
    this.id = id;
    this.name = name;
    this.project_id = project_id;
    this.project = project
    this.number_of_operators = number_of_operators;
    this.segment_id = segment_id
  }
}
