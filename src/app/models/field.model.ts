export class FieldModel{
  id: number;
  name:string;
  post_id: number;

  constructor(data:{id:number,name:string,post_id:number}) {
    this.id = data.id;
    this.name = data.name;
    this.post_id =data.post_id
  }

}
