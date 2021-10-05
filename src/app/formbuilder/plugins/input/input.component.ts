import { Component, Injector, OnInit } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'form-builder-plugin-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class FormBuilderPluginInputComponent extends PluginBaseComponent {

  constructor(
    private injector: Injector,
    ) { 
      super(injector, 'Input');
    }
    
    ngOnInit(): void {
    }
    
    receiveEvent(event: EventData) {
    }

}
