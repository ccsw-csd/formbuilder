import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/core/events/event.service';
import { EventData } from 'src/app/core/events/EventData';
import { SequentialService } from 'src/app/core/utils/event.service';
import { ContainerComponent } from '../plugins/container/container.component';
import { formMetadata } from '../plugins/plugin-config';

@Component({
  selector: 'form-builder-editor',
  templateUrl: './form-builder-editor.component.html',
  styleUrls: ['./form-builder-editor.component.scss']
})
export class FormBuilderEditorComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private COMPONENT_ID : string = 'Workspace';

  @ViewChild('container', {read: ViewContainerRef}) 
  private container: ViewContainerRef;

  private components = [];
  
  private componentClassMap = {
    'container': ContainerComponent
  }

  constructor(
    private eventService: EventService,
    private sequentialService: SequentialService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {

    this.subscription = eventService.eventSourceObservable$.subscribe(      
      event => {
        if (event.isForMe(this.COMPONENT_ID)) this.receiveEvent(event);
    });
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loadScreen(formMetadata);
    }, 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  private receiveEvent(event : EventData) {
    if (event.getData().action == 'refresh') { 
      this.sequentialService.reset();
      this.loadScreen(formMetadata);
    }
    else
      console.error('recibido '+this.COMPONENT_ID, event.getData());
  }
 

  private loadScreen(data : any) : void {
    this.removeAllComponents();

    setTimeout(() =>{
      data.components.forEach(component => {
        this.generateComponent(component);
      });      
    }, 1);
    
  }

  private generateComponent(component : any) : void {
    let componentClass = this.componentClassMap[component.type];

    if (componentClass != null)
      this.addComponent(componentClass, component);    
    else 
      console.error('Error al construir elemento editor', component);

  }


  

  private addComponent(componentClass: Type<any>, elementData:any) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.elementData = elementData;
    component.instance.data = elementData.data;
    component.instance.componentClass = componentClass;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  private removeAllComponents() {

    if (this.container != null)
      this.container.clear();
    
    this.components.forEach(element => {
      element.destroy();
    });

    this.components = [];
  }


  
}