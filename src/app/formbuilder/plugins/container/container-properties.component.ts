import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/events/event.service';

@Component({
  selector: 'form-builder-container-properties',
  templateUrl: './container-properties.component.html',
  styleUrls: ['./container-properties.component.scss']
})
export class ContainerPropertiesComponent implements OnInit, OnDestroy  {

  @Input() data: any;
  @Input() elementData: any;

  public numberChilds: number = 1;

  constructor(
    private eventService: EventService,
  ) {
   }

  ngOnInit() {
    this.numberChilds = this.elementData.components.length;    
  }

  ngOnDestroy() {
  }

  getDirectionName() : string {
    if (this.elementData.direction=='row') return 'Columnas';
    else return 'Filas';
  }

  changeNumberChilds() : void {
    if (this.numberChilds < 1) this.numberChilds = 1;
    let actualChilds = this.elementData.components;

    let deltaNumberItems = this.numberChilds - actualChilds.length;

    if (deltaNumberItems == 0) return;

    let mustDelete : boolean = deltaNumberItems < 0;

    for (let i = 0; i < Math.abs(deltaNumberItems); i++) {
      if (mustDelete) this.elementData.components.pop();
      else this.elementData.components.push({});
    }


  }

}
