import { Component, ComponentFactoryResolver, Inject, Injector, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/core/confirmation-dialog/confirmation-dialog.component";
import { EventService } from "src/app/core/events/event.service";
import { EventData } from "src/app/core/events/EventData";
import { SequentialService } from "src/app/core/utils/event.service";

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
    @Input() elementData: any;
    
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
        this.eventService.sendEvent({triger: 'click', action:'openProperties', data: this.elementData}, this.getComponentId(), 'Properties');
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
            for (var variableKey in this.elementData){
              if (this.elementData.hasOwnProperty(variableKey)){
                  delete this.elementData[variableKey];
              }
            }
          }
        });    
      }

}