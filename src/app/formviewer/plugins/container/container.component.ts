import { Component, ComponentFactoryResolver, Input, OnInit, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormViewerPluginDividerComponent } from '../divider/divider.component';
import { FormViewerPluginInputComponent } from '../input/input.component';
import { FormViewerPluginLabelComponent } from '../label/label.component';
import { FormViewerPluginSelectComponent } from '../select/select.component';
import { FormViewerPluginTextareaComponent } from '../textarea/textarea.component';

@Component({
  selector: 'form-viewer-plugin-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class FormViewerPluginContainerComponent implements OnInit {

  @Input() data: any;
  @Input() model: any;

  @ViewChildren("itemContainer", { read: ViewContainerRef }) 
  private itemContainer: QueryList<ViewContainerRef>;

  PLUGINS_CONFIG = {
    'container': {class: null},
    'divider': {class: FormViewerPluginDividerComponent},
    'label': {class: FormViewerPluginLabelComponent},
    'input': {class: FormViewerPluginInputComponent},
    'textarea': {class: FormViewerPluginTextareaComponent},
    'select': {class: FormViewerPluginSelectComponent},
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.creaComponentes(); 
    });
  }

  isItemHidden(item) : boolean {
    if (item.type != 'container') return false;
    if (item.visibility == null) return false;

    let model = this.model;
    return eval(item.visibility) == false;
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
    if (container == null) return;

    let pluginConfig = this.PLUGINS_CONFIG[component.type];

    if (pluginConfig != null) {
      if (pluginConfig.class == null) pluginConfig.class = FormViewerPluginContainerComponent;
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
    component.instance.model = this.model;
    component.instance.componentClass = componentClass;
  }


}
