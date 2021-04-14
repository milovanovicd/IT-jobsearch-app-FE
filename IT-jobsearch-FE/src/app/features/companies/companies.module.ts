import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { CompaniesService } from './companies.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobsModule } from '../jobs/jobs.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressSpinnerModule } from 'src/app/shared/components/progress-spinner/progress-spinner.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
