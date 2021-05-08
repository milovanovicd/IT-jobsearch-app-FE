import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { JobsModule } from '../jobs/jobs.module';
import { CompaniesModule } from '../companies/companies.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    JobsModule,
    CompaniesModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
