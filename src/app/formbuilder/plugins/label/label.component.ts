import { Component, Injector } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'form-builder-plugin-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class FormBuilderPluginLabelComponent extends PluginBaseComponent {
  
  constructor(
    private injector: Injector,
    ) { 
      super(injector, 'Label');
    }
    
    ngOnInit(): void {
    }
    
    receiveEvent(event: EventData) {
    }
}
