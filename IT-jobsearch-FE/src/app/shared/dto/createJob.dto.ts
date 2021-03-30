export class CreateJobDto {
  name: string;
  description: string;
  publishedDate: Date;
  deadlineDate: Date;
  position: string;
  seniority: string;
  companyId: any;
  technologies: string[];

  constructor(
    name?: string,
    description?: string,
    publishedDate?: Date,
    deadlineDate?: Date,
    position?: string,
    seniority?: string,
    companyId?: any,
    technologies?: string[]
  ) {
    this.name = name;
    this.description = description;
    this.publishedDate = publishedDate;
    this.deadlineDate = deadlineDate;
    this.position = position;
    this.seniority = seniority;
    this.companyId = companyId;
    this.technologies = technologies;
  }
}
