export class CreateCandidateDto {
  id: any;
  fullName: string;
  address: string;
  age: number;

  constructor(
    id?: any,
    fullName?: string,
    address?: string,
    age?: number
  ) {
    this.id = id;
    this.fullName = fullName;
    this.address = address;
    this.age = age;
  }
}
