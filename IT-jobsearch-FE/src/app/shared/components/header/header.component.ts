import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CredentialsService } from 'src/app/core/auth/credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _credidentialsService: CredentialsService
  ) {}

  ngOnInit(): void {}

  isLoggedIn() {
    return this._authService.loggedIn;
  }

  isCandidate() {
    return this._credidentialsService.isCandidate;
  }

  isCompany() {
    return this._credidentialsService.isCompany;
  }

  onLogout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  onCompanyProfile() {
    this._router.navigate(['/company-profile']);
  }

  onPostedJobs() {
    this._router.navigate(['/company-profile/jobs']);
  }
}
