export class CreateCompanyDto {
  id: any;
  name: string;
  description: string;
  location: string;
  industry: string;
  noOfEmployees: any;

  constructor(
    id?: any,
    name?: string,
    description?: string,
    location?: string,
    industry?: string,
    noOfEmployees?: any,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.industry = industry;
    this.noOfEmployees = noOfEmployees;
  }
}
