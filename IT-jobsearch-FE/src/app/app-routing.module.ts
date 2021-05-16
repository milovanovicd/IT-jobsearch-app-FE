import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateProfileInfoComponent, CandidateProfileJobsComponent, CandidateProfileResumeComponent } from './features/candidates/components';
import { CandidateProfilePageComponent } from './features/candidates/pages';
import {
  CompanyProfileApplicationsComponent,
  CompanyProfileInfoComponent,
  CompanyProfileJobsComponent,
  CompanyProfileJobsHistoryComponent,
} from './features/companies/components';
import {
  CompanySearchPageComponent,
  CompanyDetailsPageComponent,
  CompanyProfilePageComponent,
} from './features/companies/pages';
import { HomeComponent } from './features/home/home.component';
import { JobDetailsPageComponent } from './features/jobs/pages/job-details/job-details.page';
import { JobsSearchPageComponent } from './features/jobs/pages/jobs-search/jobs-search.page.';
import { LoginComponent } from './features/login/login.component';
import {
  AccountVerificationPageComponent,
  RegistrationPageComponent,
} from './features/registration/pages';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'confirm-account',
    component: AccountVerificationPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'jobs',
    children: [
      { path: '', component: JobsSearchPageComponent },
      { path: ':id', component: JobDetailsPageComponent },
    ],
  },
  {
    path: 'companies',
    children: [
      { path: '', component: CompanySearchPageComponent },
      {
        path: 'profile',
        component: CompanyProfilePageComponent,
        pathMatch: 'full',
      },
      { path: ':id', component: CompanyDetailsPageComponent },
    ],
  },
  {
    path: 'company-profile',
    component: CompanyProfilePageComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: CompanyProfileInfoComponent },
      { path: 'jobs', component: CompanyProfileJobsComponent },
      { path: 'jobs-history', component: CompanyProfileJobsHistoryComponent },
      { path: 'applications', component: CompanyProfileApplicationsComponent },
    ],
  },
  {
    path: 'candidate-profile',
    component: CandidateProfilePageComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: CandidateProfileInfoComponent },
      { path: 'jobs', component: CandidateProfileJobsComponent },
      { path: 'resume', component: CandidateProfileResumeComponent },
    ],
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
