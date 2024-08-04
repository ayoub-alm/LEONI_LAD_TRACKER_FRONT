export class PackagingType  {
  id: number;
  type: string;
  size: number;
  weight: number;

  constructor(id: number, type: string, size: number, weight: number) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.weight = weight;
  }
}
