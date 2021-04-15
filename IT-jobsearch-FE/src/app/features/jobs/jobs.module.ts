import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './jobs.service';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgSelectModule
  ],
  providers: [JobsService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class JobsModule {}
