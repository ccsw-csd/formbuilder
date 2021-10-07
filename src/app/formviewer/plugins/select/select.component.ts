import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventData } from 'src/app/core/model/EventData';
import { ChangeFormDataService } from '../../services/change-formdata.service';
import { RestDataLoaderService } from '../../services/rest-data-loader.service';

@Component({
  selector: 'form-viewer-plugin-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class FormViewerPluginSelectComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() formData: any;
  private subscription: Subscription;

  optionsData: any[];

  constructor(
    private restDataLoaderService : RestDataLoaderService,
    private eventService: ChangeFormDataService,
  ) {

    this.subscription = this.eventService.eventSourceObservable$.subscribe(      
      event => {
        if (this.data != null && this.formData != null && event.getSenderId() != this.data.name) this.receiveEvent(event);
    });
  }

  ngOnInit(): void {
    if (this.data.name)
      this.formData[this.data.name] = this.data.value;
      
    this.loadData();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 

  receiveEvent(event : EventData) {

    if (this.data.dependency != null) {
      if (this.data.dependency.indexOf(event.getSenderId()) >= 0) {
        this.loadData();
      }
    }
  }

  selectionChange(): void {
    if (!this.data.name) return;

    this.eventService.sendEvent({action:'change'}, this.data.name);
  }

  private loadData(): void {
    if (this.allDependenciesFilled()) {

      if (this.data.loadMethod == 'rest') {
        this.loadDataRest();
      }
      else if (this.data.loadMethod == 'local') {
        this.loadDataLocal();
      }
    }
  }

  private loadDataLocal() : void {
    let items : any[] = [];

    let dataRaw : string[] = this.data.local.data.split('\n');
    dataRaw.forEach(item => {
      let id = item.substring(0, item.indexOf(';'));
      let value = item.substring(item.indexOf(';')+1);
      
      items.push({id:id, value:value});
    });

    this.transformAndLoadData(items, this.data.local.transformData, 'id', 'value');
  }

  private loadDataRest() : void {
    this.restDataLoaderService.loadData(this.data.rest.url, this.data.rest.method).subscribe(items => {
      this.transformAndLoadData(items, this.data.rest.transformData, this.data.rest.propertyId, this.data.rest.propertyValue);
    })    
  }

  private transformAndLoadData(items: any[], transform : string, propertyId, propertyValue : string) : void {
    this.optionsData = [];

    if (transform)
      eval(transform);

    items.forEach(item => {
      this.optionsData.push({id:item[propertyId], value:item[propertyValue]});
    })

  }


  allDependenciesFilled() : boolean {
    if (this.data.dependency == null) return true;

    let notFound : boolean = false;

    let dependencies : string[] = this.data.dependency.split(',');
    dependencies.forEach(item => {
      if (this.formData[item] == null) notFound = true;
    });

    return notFound == false;
  }


}
