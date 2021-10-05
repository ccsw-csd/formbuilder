import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/core/events/event.service';
import { EventData } from 'src/app/core/events/EventData';

@Component({
  selector: 'form-builder', 
  templateUrl: './form-builder-layout.component.html',
  styleUrls: ['./form-builder-layout.component.scss']
})
export class FormBuilderLayoutComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private COMPONENT_ID : string = 'FormBuilder';
  menuComponents : boolean = true;
  menuProperties : boolean = false;
  
  @ViewChild('drawerProperties') 
  private drawerProperties: MatSidenav;


  constructor(
    private eventService: EventService
  ) {

    this.subscription = eventService.eventSourceObservable$.subscribe(      
      event => {
        if (event.isForMe(this.COMPONENT_ID)) this.receiveEvent(event);
      });
  }


  ngAfterViewInit(): void {


  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  private receiveEvent(event: EventData) {

    if (event.getData().action == 'openProperties') {
      this.menuProperties = true;
      this.drawerProperties.open();
    }
    else
      console.error('recibido '+this.COMPONENT_ID, event.getData());
  }

}
