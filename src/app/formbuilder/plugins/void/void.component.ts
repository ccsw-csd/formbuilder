import { Component, Injector } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';
import { PLUGINS_CONFIG } from '../../plugin-config';

@Component({
  selector: 'form-builder-plugin-void',
  templateUrl: './void.component.html',
  styleUrls: ['./void.component.scss']
})
export class FormBuilderPluginVoidComponent extends PluginBaseComponent {

  constructor(
    private injector: Injector,
  ) {
    super(injector, 'Void');
   }

  ngOnInit(): void {
  }

  onDrop($event) : void {
    if ($event.isPointerOverContainer == false) return;

    let element : string = $event.item.element.nativeElement.id;
    element = element.substring(element.indexOf('-')+1);

    this.createElement(element);    

    this.sendEvent({'action': 'refresh'}, 'Workspace');
  }

  createElement(element: string) : void {

    let componentConfig = PLUGINS_CONFIG[element];
    if (componentConfig != null && componentConfig.defaultConfig != null)
      Object.assign(this.data, componentConfig.defaultConfig);
  }

  receiveEvent(event: EventData) {
  }


}
