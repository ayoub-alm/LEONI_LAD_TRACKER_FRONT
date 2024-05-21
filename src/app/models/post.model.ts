import {FieldModel} from "./field.model";

export class PostModel{
  id: string;
  name: string;
  fields:FieldModel[];

  constructor(date:{id: string, name: string, fields:FieldModel[]}) {
    this.id = date.id;
    this.name = date.name;
    this.fields = date.fields;
  }

}
