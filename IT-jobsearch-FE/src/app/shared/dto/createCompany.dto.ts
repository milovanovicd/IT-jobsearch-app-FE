export class CreateCompanyDto {
  name: string;
  description: string;
  location: string;
  industry: string;
  noOfEmployees: any;

  constructor(
    name?: string,
    description?: string,
    location?: string,
    industry?: string,
    noOfEmployees?: any,
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.industry = industry;
    this.noOfEmployees = noOfEmployees;
  }
}
