import { Component, Injector, OnInit } from '@angular/core';
import { EventData } from 'src/app/core/events/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends PluginBaseComponent {

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
