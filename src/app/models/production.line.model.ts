export class ProductionLineModel{
  id: number;
  name: string;
  projectId: number;

  constructor(id: number, name: string, projectId: number) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
  }
}
