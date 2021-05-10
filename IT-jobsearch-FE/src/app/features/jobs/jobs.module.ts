import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './services/jobs.service';
import { JobApplicationsService } from './services/job-applications.service';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressSpinnerModule } from 'src/app/shared/components/progress-spinner/progress-spinner.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    NgSelectModule,
    ProgressSpinnerModule,
    MatProgressSpinnerModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [JobsService, JobApplicationsService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class JobsModule {}
