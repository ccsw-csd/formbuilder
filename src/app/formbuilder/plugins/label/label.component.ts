import { Component, Injector } from '@angular/core';
import { EventData } from 'src/app/core/events/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends PluginBaseComponent {
  
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
