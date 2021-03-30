import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './jobs.service';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [CommonModule, HttpClientModule, RouterModule, MatProgressSpinnerModule],
  providers: [JobsService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class JobsModule {}
