import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { JobsModule } from './jobs/jobs.module';
import { LoginModule } from './login/login.module';
import { CompaniesModule } from './companies/companies.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    JobsModule,
    LoginModule,
    CompaniesModule
  ]
})
export class FeaturesModule { }
