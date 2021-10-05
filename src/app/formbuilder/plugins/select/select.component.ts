import { Component, Injector, OnInit } from '@angular/core';
import { EventData } from 'src/app/core/events/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'form-builder-plugin-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class FormBuilderPluginSelectComponent extends PluginBaseComponent {

  constructor(
    private injector: Injector,
    ) { 
      super(injector, 'Select');
    }
    
    ngOnInit(): void {
    }
    
    receiveEvent(event: EventData) {
    }

}