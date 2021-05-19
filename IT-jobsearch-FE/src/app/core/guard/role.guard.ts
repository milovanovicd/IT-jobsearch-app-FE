import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '../auth/credentials.service';
import { Role } from '../auth/role.enum';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data.roles as Array<Role>;
    const { role } = this.credentialsService.getDecodedToken();


    const canActivate = !!role && this.credentialsService.hasRole(roles);

    if (!!canActivate) {
      return true;
    }

    this.router.navigate(['/home'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
