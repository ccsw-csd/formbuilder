import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/formbuilder/services/event.service';
import { EventData } from 'src/app/core/model/EventData';
import { FormViewerComponent } from 'src/app/formviewer/form-viewer/form-viewer.component';
import { formMetadata } from '../plugin-config';
import { FormBuilderService } from '../services/formbuilder.service';
import { FormBuilderDialogPropertiesComponent } from '../properties/form-builder-dialog-properties.component';
import { JsonPreviewComponent } from '../json-preview/json-preview.component';

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

  private lastEventData : EventData = null;
  formMetadata: any = {};


  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private formBuilderService : FormBuilderService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {

    this.subscription = eventService.eventSourceObservable$.subscribe(      
      event => {
        if (event.isForMe(this.COMPONENT_ID)) this.receiveEvent(event);
    });
  }

  ngOnInit() {

    Promise.resolve().then(() => {
      this.formBuilderService.loadFormMetadata(1).subscribe(formMetadata => {
        this.formMetadata = formMetadata;  
        if (this.formMetadata.openPreview) this.preview();  
      });
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  private receiveEvent(event: EventData) {

    if (event.getData().action == 'openProperties') {
      this.lastEventData = event;
      this.menuProperties = true;
      this.drawerProperties.open();
    }
    else
      console.error('recibido '+this.COMPONENT_ID, event.getData());
  }

  openPropertiesInModal(): void {
    if (this.lastEventData != null) {
      this.matDialog.open(FormBuilderDialogPropertiesComponent, {
        data: this.lastEventData.getData(),
        height: '90%',
        width: '800px',
      });    
    }
  }

  preview(): void {
    
    this.matDialog.open(FormViewerComponent, {
      data:this.formMetadata,
      height: '90%',
      width: '90%',
    });    
  
  }

  previewJSON(): void {
    
    this.matDialog.open(JsonPreviewComponent, {
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
