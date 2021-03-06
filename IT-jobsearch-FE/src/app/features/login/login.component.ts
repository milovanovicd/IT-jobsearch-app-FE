import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
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
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  toggle() {
    this.isSignUp = !this.isSignUp;
  }

  onRegister() {
    this.isLoading = true;
    const register$ = this._authService.register(this.loginForm.value);
    register$
    .pipe(
      finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }),
      untilDestroyed(this)
    )
    .subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar('Registration successful. Check your email.');
      },
      ({error}) => {
        let message = !!error.message ? error.message : "Registration successful. Check your email.";
        this.error = error;
        this.openSnackBar(message);
      }
    );

  }

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
          this.openSnackBar('Sign in successful.');
          this._router.navigate(['/home']);
        },
        ({error}) => {
          this.error = error;
          this.openSnackBar(error.message);
        }
      );
  }

  private createForm() {
    this.loginForm = this._fb.group({
      accountType: ['company'],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: true,
    });
  }

  openSnackBar(message: string, action = 'Close') {
    this._snackBar.open(message, action);
  }
}

