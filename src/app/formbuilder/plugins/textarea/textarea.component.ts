import { Component, Injector, OnInit } from '@angular/core';
import { EventData } from 'src/app/core/model/EventData';
import { PluginBaseComponent } from '../plugin-base-component';

@Component({
  selector: 'form-builder-plugin-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class FormBuilderPluginTextareaComponent extends PluginBaseComponent {

  constructor(
    private injector: Injector,
    ) { 
      super(injector, 'Textarea');
    }
    
    ngOnInit(): void {
    }
    
    receiveEvent(event: EventData) {
    }

}