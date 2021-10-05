import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { FormBuilderLayoutComponent } from './layout/form-builder-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CoreModule } from '../core/core.module';
import { FormBuilderEditorComponent } from './editor/form-builder-editor.component';
import { FormBuilderPluginContainerComponent } from './plugins/container/container.component';
import { FormBuilderPropertiesComponent } from './properties/form-builder-properties.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ContainerPropertiesComponent } from './plugins/container/container-properties.component';
import { FormBuilderPluginLabelComponent } from './plugins/label/label.component';
import { LabelPropertiesComponent } from './plugins/label/label-properties.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilderPluginVoidComponent } from './plugins/void/void.component';
import { FormBuilderPluginInputComponent } from './plugins/input/input.component';
import { InputPropertiesComponent } from './plugins/input/input-properties.component';
import { FormBuilderPluginTextareaComponent } from './plugins/textarea/textarea.component';
import { TextareaPropertiesComponent } from './plugins/textarea/textarea-properties.component';
import { FormBuilderPluginSelectComponent } from './plugins/select/select.component';
import { SelectPropertiesComponent } from './plugins/select/select-properties.component';

@NgModule({
  declarations: [
    FormBuilderLayoutComponent, 
    FormBuilderEditorComponent,
    FormBuilderPropertiesComponent, 
    FormBuilderPluginVoidComponent, 
    FormBuilderPluginContainerComponent, ContainerPropertiesComponent, 
    FormBuilderPluginLabelComponent, LabelPropertiesComponent, 
    FormBuilderPluginInputComponent, InputPropertiesComponent, 
    FormBuilderPluginTextareaComponent, TextareaPropertiesComponent, 
    FormBuilderPluginSelectComponent, SelectPropertiesComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DragDropModule,
    MatSidenavModule,
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
  ],
  exports: [
    FormBuilderLayoutComponent
  ]
})
export class FormBuilderModule {  
}
