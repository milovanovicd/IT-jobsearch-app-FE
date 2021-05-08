import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { JobsModule } from './jobs/jobs.module';
import { LoginModule } from './login/login.module';
import { CompaniesModule } from './companies/companies.module';
import { RegistrationModule } from './registration/registration.module';
import { CandidatesModule } from './candidates/candidates.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobsModule,
    LoginModule,
    RegistrationModule,
    CompaniesModule,
    CandidatesModule,
    HomeModule
  ],
})
export class FeaturesModule {}
