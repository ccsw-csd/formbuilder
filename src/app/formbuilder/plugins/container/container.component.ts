import { Component, ComponentFactoryResolver, Injector, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { EventData } from 'src/app/core/events/EventData';
import { PluginComponent } from '../plugin-component';
import { PLUGINS_CONFIG } from '../plugin-config';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends PluginComponent  {

  @ViewChildren("itemContainer", { read: ViewContainerRef }) 
  private itemContainer: QueryList<ViewContainerRef>;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(injector, 'Container');
   }

   ngOnInit() {
      setTimeout(() => {
        this.creaComponentes(); 
      }, 1);
   }

   creaComponentes() {
    if (this.itemContainer == null) return;

    let indexItemContainer = 0;
    let arrayElements : ViewContainerRef[] = this.itemContainer.toArray();

    this.elementData.components.forEach(element => {
      if (element.type != null) {
        this.generateComponent(arrayElements[indexItemContainer], element);
        indexItemContainer++;
      }

    });

  }

  ngOnDestroy() {    
  }

  receiveEvent(event: EventData) {

  }

  private generateComponent(container: ViewContainerRef, component : any) : void {
    let pluginConfig = PLUGINS_CONFIG[component.type];

    if (pluginConfig != null) {
      if (pluginConfig.class == null) pluginConfig.class = ContainerComponent;
      this.addComponent(container, pluginConfig.class, component);    
    }
    else 
      console.error('Error al construir elemento editor', component);

  }


  private addComponent(container: ViewContainerRef, componentClass: Type<any>, elementData:any) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = container.createComponent(componentFactory);

    component.instance.elementData = elementData;
    component.instance.data = elementData.data;
    component.instance.componentClass = componentClass;
  }

  

}