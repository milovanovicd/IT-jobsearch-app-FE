import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { untilDestroyed } from 'src/app/core/until-destroyed';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isSignUp = false;
  error: string | undefined;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private credentialsService: CredentialsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  toggle() {
    this.isSignUp = !this.isSignUp;
  }

  // onLogin() {
  //   this.isLoading = true;
  //   const login$ = this._authService.login(this.loginForm.value);
  // }

  onLogin() {
    this.isLoading = true;
    const login$ = this._authService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          console.log('Credidentials', credentials);
          this._router.navigate(['/home']);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this._fb.group({
      accountType: ['company'],
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}

