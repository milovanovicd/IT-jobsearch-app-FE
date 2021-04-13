import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoreModule } from '../core/core.module';
import { MatMenuModule } from '@angular/material/menu';
import { AppOverlayModule } from './components/overlay/overlay.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from './components/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule,
    CoreModule,
    AppOverlayModule,
  ],
  exports: [...fromComponents.components],
})
export class SharedModule {}
