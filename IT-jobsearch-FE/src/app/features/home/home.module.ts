import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { JobsModule } from '../jobs/jobs.module';
import { CompaniesModule } from '../companies/companies.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    JobsModule,
    MatButtonModule,
    CompaniesModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
