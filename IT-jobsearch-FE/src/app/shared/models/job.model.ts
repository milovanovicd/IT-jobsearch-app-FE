import { Company } from './company.model';
import { Position } from './position.model';
import { Seniority } from './seniority.model';
import { Technology } from './technology.model';

export class Job {
  id: any;
  name: string;
  description: string;
  publishedDate: Date;
  deadlineDate: Date;
  position: Position;
  seniority: Seniority;
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
    this.company = company;
    this.technologies = technologies;
  }
}
