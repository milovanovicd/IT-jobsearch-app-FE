interface JobApplicationCandidate {
  id: any;
  fullName: string;
  age: number;
  resume: string;
}

interface JobApplicationCompany {
  id: any;
  name: string;
  location: string;
  industry: string;
}

interface JobApplicationJob {
  id: any;
  name: string;
  publishedDate: string;
  deadlineDate: string;
  position: string;
  seniority: string;
  company: JobApplicationCompany;
}

export class JobApplicationDto {
  job: JobApplicationJob;
  candidate: JobApplicationCandidate;
  createdOn: string;

  constructor(
    job?: JobApplicationJob,
    candidate?: JobApplicationCandidate,
    createdOn?: string
  ) {
    this.job = job;
    this.candidate = candidate;
    this.createdOn = createdOn;
  }
}
