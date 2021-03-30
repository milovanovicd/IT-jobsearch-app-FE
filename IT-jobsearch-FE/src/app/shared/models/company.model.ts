import { Industry } from './industry.model';
import { Job } from './job.model';
import { User } from './user.model';

export class Company {
  id: any;
  user: User;
  name: string;
  location: string;
  noOfEmployees: number;
  industry: Industry;
  jobs: [Job];

  constructor(
    id?: any,
    user?: User,
    name?: string,
    location?: string,
    noOfEmployees?: number,
    industry?: Industry,
    jobs?: [Job]
  ) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.location = location;
    this.noOfEmployees = noOfEmployees;
    this.industry = industry;
    this.jobs = jobs;
  }
}
