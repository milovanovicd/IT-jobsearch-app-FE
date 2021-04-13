import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProfileApplicationsComponent, CompanyProfileInfoComponent, CompanyProfileJobsComponent } from './features/companies/components';
import { CompaniesSearchPageComponent, CompanyDetailsPageComponent, CompanyProfilePageComponent } from './features/companies/pages';
import { HomeComponent } from './features/home/home.component';
import { JobsListComponent } from './features/jobs/components';
import { JobDetailsPageComponent } from './features/jobs/pages/job-details/job-details.page';
import { JobsSearchPageComponent } from './features/jobs/pages/jobs-search/jobs-search.page.';
import { LoginComponent } from './features/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jobs',
    children: [
      {path: '', component: JobsSearchPageComponent},
      {path: ':id', component: JobDetailsPageComponent}
    ]
  },
  {
    path: 'companies',
    children: [
      {path: '', component: CompaniesSearchPageComponent},
      {path: 'profile', component: CompanyProfilePageComponent, pathMatch: 'full'},
      {path: ':id', component: CompanyDetailsPageComponent}
    ]
  },
  {
    path: 'company-profile',
    component: CompanyProfilePageComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: CompanyProfileInfoComponent},
      {path: 'jobs', component: CompanyProfileJobsComponent},
      {path: 'applications', component: CompanyProfileApplicationsComponent},
    ]
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
