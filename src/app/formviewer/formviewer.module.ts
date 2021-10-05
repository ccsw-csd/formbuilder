import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { ContainerComponent } from './plugins/container/container.component';
import { FormViewerPluginLabelComponent } from './plugins/label/label.component';
import { FormViewerPluginInputComponent } from './plugins/input/input.component';
import { FormViewerPluginVoidComponent } from './plugins/void/void.component';
import { TextareaComponent } from './plugins/textarea/textarea.component';
import { SelectComponent } from './plugins/select/select.component';



@NgModule({
  declarations: [FormViewerComponent, ContainerComponent, FormViewerPluginLabelComponent, FormViewerPluginInputComponent, FormViewerPluginVoidComponent, TextareaComponent, SelectComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatTabsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,  
    MatButtonModule,
    MatIconModule,  
  ]
})
export class FormViewerModule { }
