import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/formbuilder/services/event.service';
import { EventData } from 'src/app/core/model/EventData';
import { FormViewerComponent } from 'src/app/formviewer/form-viewer/form-viewer.component';
import { formMetadata } from '../plugin-config';

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

  formMetadata: any;


  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
  ) {

    this.subscription = eventService.eventSourceObservable$.subscribe(      
      event => {
        if (event.isForMe(this.COMPONENT_ID)) this.receiveEvent(event);
    });
  }

  ngOnInit() {
    this.formMetadata = formMetadata;  
    if (this.formMetadata.openPreview) this.preview();  
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

  preview(): void {
    
    this.matDialog.open(FormViewerComponent, {
      data:this.formMetadata,
      height: '90%',
      width: '90%',
    });    
  
  }

  close(): void {

  }

  save(): void {

  }

}
