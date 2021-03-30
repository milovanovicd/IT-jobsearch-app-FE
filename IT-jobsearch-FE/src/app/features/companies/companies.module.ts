import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components/index';
import * as fromPages from './pages/index';
import { CompaniesService } from './companies.service';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [CommonModule],
  providers: [CompaniesService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class CompaniesModule {}
