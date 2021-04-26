import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/shared/dto/user.dto';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
  accountType?: string;
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

  /**
   * Logs out the user and clear credentials.
   * @param token Verification token.
   * @return True if the user activated his account successfully.
   */
  confirmAccount(token: string) {
    return this.http.get(`${environment.authURL}/confirm-account?token=${token}`);
  }

  /**
   * Gets user by id.
   * @param id User id.
   * @return True the UserDto.
   */
   getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.authURL}/users/${id}`);
  }

  /**
   * Register the new user.
   * @param context The register parameters.
   */
  register(context: LoginContext) {
    const user = {
      username: context.email,
      password: context.password,
      accountType: context.accountType
    };

    return this.http.post(`${environment.authURL}/register`, user).pipe(tap(response => console.log(response)));
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

  get loggedIn() {
    return this.credentialsService.isAuthenticated();
  }
}
