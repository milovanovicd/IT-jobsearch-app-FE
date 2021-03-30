import { Candidate } from './candidate.model';
import { Company } from './company.model';

export class User {
  id: any;
  username: string;
  password: string;
  company: Company;
  candidate: Candidate;

  constructor(
    id?: any,
    username?: string,
    password?: string,
    company?: Company,
    candidate?: Candidate
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.company = company;
    this.candidate = candidate;
  }
}
