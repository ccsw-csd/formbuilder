import { Component, ComponentFactoryResolver, Inject, Injector, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/core/confirmation-dialog/confirmation-dialog.component";
import { EventService } from "src/app/formbuilder/services/event.service";
import { EventData } from "src/app/core/model/EventData";
import { SequentialService } from "src/app/core/services/sequential.service";

@Component({
    selector: 'plugin-base',
    template: `
        <div>
            base works!!
        </div>
    `
})
export abstract class PluginBaseComponent implements OnInit, OnDestroy {

  @Input() data: any;
    
    private subscription: Subscription;
    private COMPONENT_INTERNAL_ID : number = 0;
    private COMPONENT_NAME : string = 'Dummy';

    private eventService: EventService;
    private sequentialService: SequentialService;
    private dialog: MatDialog;

    constructor(private injectorBase: Injector, @Inject(String) private componentName: string) {

        this.eventService = injectorBase.get(EventService);
        this.sequentialService = injectorBase.get(SequentialService);
        this.dialog = injectorBase.get(MatDialog);
    
        this.COMPONENT_NAME = componentName;
        this.COMPONENT_INTERNAL_ID = this.sequentialService.getNextValue();
        this.subscription = this.eventService.eventSourceObservable$.subscribe(      
          event => {
            if (event.isForMe(this.getComponentId())) this.receiveEvent(event);
          });
    }

    getComponentId() : string {
        return this.COMPONENT_NAME+"-"+this.COMPONENT_INTERNAL_ID;
    }

    abstract ngOnInit();
    abstract receiveEvent(event: EventData);
    

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }     

    sendEvent(data: any, targetId?: string) : void {
        this.eventService.sendEvent(data, this.getComponentId(), targetId);
    }

    edit() : void {
        this.eventService.sendEvent({triger: 'click', action:'openProperties', data: this.data}, this.getComponentId(), 'Properties');
    }
    
    delete() : void {    
        this.dialog
        .open(ConfirmationDialogComponent, {
          data:{title: 'Borrar componente',body: 'El componente y sus hijos se eliminarán. ¿Estás seguro de eliminarlo?'},
          height: '300px',
          width: '600px',
        })
        .afterClosed()
        .subscribe((result: Boolean) => {
          if (result == true) {
            for (var variableKey in this.data){
              if (this.data.hasOwnProperty(variableKey)){
                  delete this.data[variableKey];
              }
            }
          }
        });    
      }

}