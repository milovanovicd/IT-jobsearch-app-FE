import { Company } from './company.model';
import { Position } from './position.model';
import { Seniority } from './seniority.model';
import { Status } from './status.model';
import { Technology } from './technology.model';

export class Job {
  id: any;
  name: string;
  description: string;
  publishedDate: Date;
  deadlineDate: Date;
  position: Position;
  seniority: Seniority;
  status: Status;
  company: Company;
  technologies: Technology[];

  constructor(
    id?: any,
    name?: string,
    description?: string,
    publishedDate?: Date,
    deadlineDate?: Date,
    position?: Position,
    seniority?: Seniority,
    status?: Status,
    company?: Company,
    technologies?: Technology[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.publishedDate = publishedDate;
    this.deadlineDate = deadlineDate;
    this.position = position;
    this.seniority = seniority;
    this.status = status;
    this.company = company;
    this.technologies = technologies;
  }
}
