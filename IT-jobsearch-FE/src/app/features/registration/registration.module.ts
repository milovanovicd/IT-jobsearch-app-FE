import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromPages from './pages';
import { RegistrationService } from './registration.service';
import { MatButtonModule } from '@angular/material/button';
import { AppOverlayModule } from 'src/app/shared/components/overlay/overlay.module';
import { ProgressSpinnerModule } from 'src/app/shared/components/progress-spinner/progress-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.pages],
  imports: [
    CommonModule,
    MatButtonModule,
    AppOverlayModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgSelectModule,
  ],
  providers: [RegistrationService],
  exports: [...fromComponents.components, ...fromPages.pages],
})
export class RegistrationModule {}
