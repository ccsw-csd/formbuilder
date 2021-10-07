import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/formbuilder/services/event.service';
import { EventData } from 'src/app/core/model/EventData';
import { PLUGINS_CONFIG } from '../plugin-config';

@Component({
  selector: 'form-builder-properties',
  templateUrl: './form-builder-properties.component.html',
  styleUrls: ['./form-builder-properties.component.scss']
})
export class FormBuilderPropertiesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private COMPONENT_ID : string = 'Properties';

  @ViewChild('container', {read: ViewContainerRef}) 
  private container: ViewContainerRef;

  constructor(
    private eventService: EventService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { 

    this.subscription = eventService.eventSourceObservable$.subscribe(      
      event => {
        if (event.isForMe(this.COMPONENT_ID)) this.receiveEvent(event);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private receiveEvent(event : EventData) {

    if (event.getData().action == 'openProperties') {
      this.generateComponent(event.getData().data);
      this.eventService.sendEvent({action:'openProperties', componentType: event.getData().data.type, data: event.getData().data}, this.COMPONENT_ID, "FormBuilder");
    }
    else 
      console.error('recibido properties', event.getData());
  }



  private generateComponent(component : any) : void {
    
    this.removeAllComponents();
    
    let componentConfig = PLUGINS_CONFIG[component.type];
    
    if (componentConfig != null && componentConfig.configClass != null) {
      this.addComponent(componentConfig.configClass, component);          
    }
    else 
      console.error('Error al construir elemento properties', component);
  }


  

  private addComponent(componentClass: Type<any>, data:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.data = data;
    component.instance.componentClass = componentClass;
  }

  private removeAllComponents() {

    this.container.clear();
  }



}
