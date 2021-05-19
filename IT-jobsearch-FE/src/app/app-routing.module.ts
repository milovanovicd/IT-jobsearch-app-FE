import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { Role } from './core/auth/role.enum';
import { RoleGuard } from './core/guard/role.guard';
import { CandidateProfileDeleteAccountComponent, CandidateProfileInfoComponent, CandidateProfileJobsComponent, CandidateProfileResumeComponent } from './features/candidates/components';
import { CandidateProfilePageComponent } from './features/candidates/pages';
import {
  CompanyProfileApplicationsComponent,
  CompanyProfileDeleteAccountComponent,
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
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.Company] },
    component: CompanyProfilePageComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: CompanyProfileInfoComponent },
      { path: 'jobs', component: CompanyProfileJobsComponent },
      { path: 'jobs-history', component: CompanyProfileJobsHistoryComponent },
      { path: 'applications', component: CompanyProfileApplicationsComponent },
      { path: 'delete-account', component: CompanyProfileDeleteAccountComponent },
    ],
  },
  {
    path: 'candidate-profile',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.Candidate] },
    component: CandidateProfilePageComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: CandidateProfileInfoComponent },
      { path: 'jobs', component: CandidateProfileJobsComponent },
      { path: 'resume', component: CandidateProfileResumeComponent },
      { path: 'delete-account', component: CandidateProfileDeleteAccountComponent },
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
