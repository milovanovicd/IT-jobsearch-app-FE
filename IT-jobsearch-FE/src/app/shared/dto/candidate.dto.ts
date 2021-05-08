import { JobApplicationDto } from './jobApplication.dto'

export class CandidateDto {
  id: any;
  fullName: string;
  age: number;
  address: string;
  resume: string;
  jobApplications: JobApplicationDto[];

  constructor(
    id?: any,
    fullName?: string,
    age?: number,
    address?: string,
    resume?: string,
    jobApplications?: JobApplicationDto[]
  ) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.address = address;
    this.resume = resume;
    this.jobApplications = jobApplications;
  }
}
