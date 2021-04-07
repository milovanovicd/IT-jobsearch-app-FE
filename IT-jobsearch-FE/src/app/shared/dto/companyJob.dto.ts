export class CompanyJobDto {
  id: any;
  name: string;
  description: string;
  publishedDate: Date;
  deadlineDate: Date;

  constructor(
    id?: any,
    name?: string,
    description?: string,
    publishedDate?: Date,
    deadlineDate?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.publishedDate = publishedDate;
    this.deadlineDate = deadlineDate;
  }
}
