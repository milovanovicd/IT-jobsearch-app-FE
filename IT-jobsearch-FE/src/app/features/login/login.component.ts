import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSignUp = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      accountType: ['company'],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  toggle() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit(){
    console.log(this.loginForm);
  }

}
