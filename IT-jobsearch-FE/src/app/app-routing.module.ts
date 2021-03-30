import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesPageComponent, CompanyDetailsPageComponent } from './features/companies/pages';
import { HomeComponent } from './features/home/home.component';
import { JobDetailsPageComponent } from './features/jobs/pages/job-details/job-details.page';
import { JobsPageComponent } from './features/jobs/pages/jobs/jobs.page.';
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
    children:[
      {path: '', component: JobsPageComponent},
      {path: ':id', component: JobDetailsPageComponent}
    ]
  },
  {
    path: 'companies',
    children:[
      {path: '', component: CompaniesPageComponent},
      {path: ':id', component: CompanyDetailsPageComponent}
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
