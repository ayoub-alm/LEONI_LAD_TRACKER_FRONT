import { ProductionLineModel } from "./production.line.model";
import { ProjectModel } from "./project.model";

export class SegmntModel{
    id:number;
    name:string;
    project_id:number;
    sum_of_hc_of_lines:number;
    production_lines:ProductionLineModel[];
    project:ProjectModel;

    constructor(
        id:number,
        name:string,
        project_id:number,
        sum_of_hc_of_lines:number,
        production_lines:ProductionLineModel[],
        project:ProjectModel
    ){
        this.id =id;
        this.name = name;
        this.project_id =  project_id
        this.sum_of_hc_of_lines = sum_of_hc_of_lines;
        this.production_lines = production_lines;
        this.project =  project;
    }
}