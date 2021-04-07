import { CompanyJobDto } from './companyJob.dto';

export class CompanyDto {
  id: any;
  name: string;
  description: string;
  location: string;
  industry: string;
  noOfEmployees: any;
  jobs: CompanyJobDto[];

  constructor(
    id?: any,
    name?: string,
    description?: string,
    location?: string,
    industry?: string,
    noOfEmployees?: any,
    jobs?: CompanyJobDto[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.industry = industry;
    this.noOfEmployees = noOfEmployees;
    this.jobs = jobs;
  }
}
