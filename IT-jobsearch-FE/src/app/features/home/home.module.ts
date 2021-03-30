import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { JobsModule } from '../jobs/jobs.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    JobsModule
  ]
})
export class HomeModule { }
