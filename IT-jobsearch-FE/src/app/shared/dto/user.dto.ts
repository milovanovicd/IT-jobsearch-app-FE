interface UserCandidate {
  id: any;
  fullName: string;
}

interface UserCompany {
  id: any;
  name: string;
}

export class UserDto {
  id: any;
  username: string;
  company?: UserCompany;
  candidate?: UserCandidate;

  constructor(
    id?: any,
    username?: string,
    company?: UserCompany,
    candidate?: UserCandidate
  ) {
    this.id = id;
    this.username = username;
    this.company = company;
    this.candidate = candidate;
  }
}
