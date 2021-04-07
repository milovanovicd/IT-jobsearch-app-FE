import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  company?: string;
  candidate?: string;
}

import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyDto } from 'src/app/shared/dto/company.dto';
import { Role } from './role.enum';
const jwtHelper = new JwtHelperService();

const credentialsKey = 'credentials';
const companyKey = 'company';
const candidateKey = 'candidate';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable()
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  getDecodedToken() {
    return this.credentials.token.split('.').length === 3 ? this.decodeToken(this.credentials.token) : { role: '' };
  }

  decodeToken(token: string) {
    return jwtHelper.decodeToken(token);
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  setCompany(company?: CompanyDto){
    const companyToAdd = company || null;

    if (company) {
      localStorage.setItem(companyKey, JSON.stringify(companyToAdd));
    } else {
      localStorage.removeItem(companyKey);
    }
  }

  setCandidate(candidate?: any){
    const candidateToAdd = candidate || null;

    if (candidate) {
      localStorage.setItem(candidateKey, JSON.stringify(candidateToAdd));
    } else {
      localStorage.removeItem(candidateKey);
    }
  }

  hasRole(roles: Role[]) {
    let hasRole = false;
    const { role } = this.getDecodedToken();

    roles.forEach(r => {
      if (role.includes(r)) {
        hasRole = true;
      }
    });

    return hasRole;
  }
}
