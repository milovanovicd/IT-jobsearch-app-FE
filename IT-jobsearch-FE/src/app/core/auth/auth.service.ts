import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from './role.enum';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
  accountType?: string;
}

export interface UserCandidate {
  id: string;
  fullName: string;
}

export interface UserCompany {
  id: string;
  name: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient, private router: Router) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<boolean> {
    const user = {
      username: context.email,
      password: context.password
    };

    return this.http.post(`${environment.authURL}/signin`, user).pipe(
      map((res: any) => {
        console.log(this.credentialsService.decodeToken(res.token));
        this.credentialsService.setCredentials(
          {
            username: context.email,
            token: res.token,
            company: this.credentialsService.decodeToken(res.token).company,
            candidate: this.credentialsService.decodeToken(res.token).candidate
          },
          context.remember,
        );
        return true;
      }),
      catchError(err => throwError(err))
    );
  }

  registerCustomer(email: string) {
    return this.http.post(`${environment.apiURL}/accounts/register`, { email }).pipe(
      map((res: any) => {
        // If Admin is creating a new user, don't use new user's token
        if (this.router.url.indexOf('admin-onboarding') === -1) {
          this.credentialsService.setCredentials(
            {
              username: email,
              token: res.token
            },
            true
          );
        }

        return this.credentialsService.decodeToken(res.token).subject;
      }),
      catchError(err => of(false))
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.credentialsService.setCompany();
    this.credentialsService.setCandidate();
    return of(true);
  }

  getCompany(): UserCompany {
    const { company } = this.decodedToken;
    return company !== undefined ? company : null;
  }

  getCandidate(): UserCandidate {
    const { candidate } = this.decodedToken;
    return candidate !== undefined ? candidate : null;
  }

  get decodedToken() {
    return this.credentialsService.getDecodedToken();
  }

  get loggedIn() {
    return this.credentialsService.isAuthenticated();
  }

  get isCandidate() {
    return this.credentialsService.isAuthenticated() && this.credentialsService.getDecodedToken().role.includes(Role.Candidate);
  }

  get isCompany() {
    return this.credentialsService.isAuthenticated() && this.credentialsService.getDecodedToken().role.includes(Role.Company);
  }
}
