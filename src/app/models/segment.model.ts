import { ProductionLineModel } from "./production.line.model";

export class SegmentModul {
    id: number;
    name: string;
    projectId: number;
    sumOfHcOfLines: number;
    productionLines: ProductionLineModel[];

    constructor(
        id: number,
        name: string,
        projectId: number,
        sumOfHcOfLines: number,
        productionLines: ProductionLineModel[]
      
    ) {
        this.id = id;
        this.name = name;
        this.projectId = projectId;
        this.sumOfHcOfLines = sumOfHcOfLines;
        this.productionLines = productionLines;
    }
}



