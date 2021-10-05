import { Component, ComponentFactoryResolver, Input, OnInit, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormViewerPluginInputComponent } from '../input/input.component';
import { FormViewerPluginLabelComponent } from '../label/label.component';

@Component({
  selector: 'form-viewer-plugin-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @Input() 
  data: any;

  @ViewChildren("itemContainer", { read: ViewContainerRef }) 
  private itemContainer: QueryList<ViewContainerRef>;

  PLUGINS_CONFIG = {
    'container': {class: null},
    'label': {class: FormViewerPluginLabelComponent},
    'input': {class: FormViewerPluginInputComponent},
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.creaComponentes(); 
    }, 1);
  }

  creaComponentes() {
    if (this.itemContainer == null) return;

    let indexItemContainer = 0;
    let arrayElements : ViewContainerRef[] = this.itemContainer.toArray();

    this.data.components.forEach(element => {
      if (element.type != null) {
        this.generateComponent(arrayElements[indexItemContainer], element);
        indexItemContainer++;
      }

    });

  }

  private generateComponent(container: ViewContainerRef, component : any) : void {
    let pluginConfig = this.PLUGINS_CONFIG[component.type];

    if (pluginConfig != null) {
      if (pluginConfig.class == null) pluginConfig.class = ContainerComponent;
      this.addComponent(container, pluginConfig.class, component);    
    }
    else 
      console.error('Error al construir elemento editor', component);

  }

  private addComponent(container: ViewContainerRef, componentClass: Type<any>, data:any) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = container.createComponent(componentFactory);

    component.instance.data = data;
    component.instance.componentClass = componentClass;
  }


}
