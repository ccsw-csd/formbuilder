import { Component, Injector } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'form-builder-plugin-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class FormBuilderPluginDividerComponent extends PluginBaseComponent {
  
  constructor(
    private injector: Injector,
    ) { 
      super(injector, 'Divider');
    }
    
    ngOnInit(): void {
    }
    
    receiveEvent(event: EventData) {
    }
}
