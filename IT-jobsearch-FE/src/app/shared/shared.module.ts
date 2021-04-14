import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoreModule } from '../core/core.module';
import { MatMenuModule } from '@angular/material/menu';
import { AppOverlayModule } from './components/overlay/overlay.module';
import { MetadataService } from './services/metadata.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule,
    CoreModule,
    AppOverlayModule,
  ],
  exports: [...fromComponents.components],
  providers: [MetadataService]
})
export class SharedModule {}
