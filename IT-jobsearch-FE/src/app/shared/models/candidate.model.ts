import { User } from './user.model';

export class Candidate {
  id: any;
  user: User;
  age: number;
  address: string;

  constructor(id?: any, user?: User, address?: string, age?: number) {
    this.id = id;
    this.user = user;
    this.age = age;
    this.address = address;
  }
}
