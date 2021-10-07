import { Component, ComponentFactoryResolver, Injector, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';
import { PLUGINS_CONFIG } from '../../plugin-config';

@Component({
  selector: 'form-builder-plugin-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class FormBuilderPluginContainerComponent extends PluginBaseComponent  {

  @ViewChildren("itemContainer", { read: ViewContainerRef }) 
  private itemContainer: QueryList<ViewContainerRef>;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(injector, 'Container');
   }

  ngOnInit() {
    Promise.resolve().then(() => {
      this.creaComponentes(); 
    });
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

  isHidden() : boolean {
    if (this.data.visibility == null) return false;
    else return true;
  }

  ngOnDestroy() {    
  }

  receiveEvent(event: EventData) {

  }

  private generateComponent(container: ViewContainerRef, component : any) : void {
    let pluginConfig = PLUGINS_CONFIG[component.type];

    if (pluginConfig != null) {
      if (pluginConfig.class == null) pluginConfig.class = FormBuilderPluginContainerComponent;
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
