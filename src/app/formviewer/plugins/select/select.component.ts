import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventData } from 'src/app/core/events/EventData';
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

  receiveEvent(event : EventData) {

    if (this.data.dependency != null) {
      if (this.data.dependency.indexOf(event.getSenderId()) >= 0) {
        this.loadData();
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 


  selectionChange(): void {
    if (!this.data.name) return;

    this.eventService.sendEvent({action:'change'}, this.data.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', changes);
  }

  ngOnInit(): void {
    if (this.data.name)
      this.formData[this.data.name] = this.data.value;
      
    this.loadData();
  }

  loadData(): void {
    if (this.allDependenciesFilled()) {
      this.restDataLoaderService.loadData(this.data.rest.url, this.data.rest.method).subscribe(result => {
        this.transformData(result);
      })    
    }
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


  private transformData(items: any[]) : void {
    this.optionsData = [];

    if (this.data.rest.preHook)
      eval(this.data.rest.preHook);

    items.forEach(item => {
      this.optionsData.push({id:item[this.data.rest.propertyId], value:item[this.data.rest.propertyValue]});
    })

    if (this.data.rest.postHook)
      eval(this.data.rest.postHook);
  }

}
