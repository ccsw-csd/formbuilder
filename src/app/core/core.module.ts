import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ]  
})
export class CoreModule { }
