import { Component, ComponentFactoryResolver, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PLUGINS_CONFIG } from '../plugin-config';

@Component({
  selector: 'app-form-builder-dialog-properties',
  templateUrl: './form-builder-dialog-properties.component.html',
  styleUrls: ['./form-builder-dialog-properties.component.scss']
})
export class FormBuilderDialogPropertiesComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) 
  private container: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogo: MatDialogRef<FormBuilderDialogPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDialog?: any,
  ) { 
  }

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.generateComponent(this.dataDialog);
    });
  }

  private generateComponent(dataDialog : any) : void {
    let componentConfig = PLUGINS_CONFIG[dataDialog.componentType];
    
    if (componentConfig != null && componentConfig.configClass != null) {
      this.addComponent(componentConfig.configClass, dataDialog.data);    
    }
    else 
      console.error('Error al construir elemento properties', dataDialog);
  }

  private addComponent(componentClass: Type<any>, data:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.data = data;
    component.instance.componentClass = componentClass;
  }

  close() : void {
      this.dialogo.close();
  }
}
