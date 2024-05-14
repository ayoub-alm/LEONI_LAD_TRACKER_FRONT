export class ProductionLineModel{
  id: number;
  name: string;
  project_id: number;

  constructor(id: number, name: string, project_id: number) {
    this.id = id;
    this.name = name;
    this.project_id = project_id;
  }
}
