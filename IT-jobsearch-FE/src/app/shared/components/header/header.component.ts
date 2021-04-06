import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this._authService.loggedIn;
  }

  isCandidate(){
    return this._authService.isCandidate;
  }

  isCompany(){
    return this._authService.isCompany;
  }

  onLogout(){
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
