import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-properties',
  templateUrl: './select-properties.component.html',
  styleUrls: ['./select-properties.component.scss']
})
export class SelectPropertiesComponent implements OnInit {

  @Input() data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  selecLoadMethodChange() : void {
    if (this.data.loadMethod == 'rest') this.data.rest = Object.assign({}, this.data.rest);
    if (this.data.loadMethod == 'local') this.data.local = Object.assign({}, this.data.local);
  }

}
