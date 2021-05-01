import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromPages from './pages/index';
import * as fromComponents from './components/index';
import { CandidatesService } from './candidates.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressSpinnerModule } from 'src/app/shared/components/progress-spinner/progress-spinner.module';
import { JobsModule } from '../jobs/jobs.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [...fromPages.pages, ...fromComponents.components],
  imports: [
    CommonModule,
    MaterialModule,
    JobsModule,
    ReactiveFormsModule,
    RouterModule,
    ProgressSpinnerModule,
    NgSelectModule
  ],
  providers: [CandidatesService],
  exports: [...fromPages.pages, ...fromComponents.components]
})
export class CandidatesModule {}
