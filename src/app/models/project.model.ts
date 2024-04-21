export class ProjectModel{
  id: number;
  name: string;
  ref: string;

  constructor(id: number, name: string, ref: string) {
    this.id = id;
    this.name = name;
    this.ref = ref;
  }
}
