import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { CompaniesService } from './companies.service';
import { JobsModule } from '../jobs/jobs.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressSpinnerModule } from 'src/app/shared/components/progress-spinner/progress-spinner.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [
    CommonModule,
    MaterialModule,
    JobsModule,
    ReactiveFormsModule,
    RouterModule,
    ProgressSpinnerModule,
    NgSelectModule,
  ],
  providers: [CompaniesService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class CompaniesModule {}
