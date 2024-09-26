export class UserModel {
  id: number ;
  username: string;
  matriculate: string;
  password : string;
  role :string;

  constructor(id: number , username: string, matriculate: string, password: string, role: string) {
    this.id = id;
    this.username = username;
    this.matriculate = matriculate;
    this.password = password;
    this.role = role;
  }
}
