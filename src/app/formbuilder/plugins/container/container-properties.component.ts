import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/formbuilder/services/event.service';

@Component({
  selector: 'form-builder-container-properties',
  templateUrl: './container-properties.component.html',
  styleUrls: ['./container-properties.component.scss']
})
export class ContainerPropertiesComponent implements OnInit, OnDestroy  {

  @Input() data: any = {};

  public numberChilds: number = 1;

  constructor(
    private eventService: EventService,
  ) {
  }

  ngOnInit() {
    this.numberChilds = this.data.components.length;    
  }

  ngOnDestroy() {
  }

  getDirectionName() : string {
    if (this.data.direction=='row') return 'Columnas';
    else return 'Filas';
  }

  changeNumberChilds() : void {
    if (this.numberChilds < 1) this.numberChilds = 1;
    let actualChilds = this.data.components;

    let deltaNumberItems = this.numberChilds - actualChilds.length;

    if (deltaNumberItems == 0) return;

    let mustDelete : boolean = deltaNumberItems < 0;

    for (let i = 0; i < Math.abs(deltaNumberItems); i++) {
      if (mustDelete) this.data.components.pop();
      else this.data.components.push({});
    }


  }

}
