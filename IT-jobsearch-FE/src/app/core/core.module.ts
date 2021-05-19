import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CredentialsService } from './auth/credentials.service';
import { TokenInterceptor } from './http/token.interceptor';

@NgModule({
  imports: [ CommonModule, HttpClientModule, RouterModule],
  providers: [
    AuthService,
    CredentialsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
