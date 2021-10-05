import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-properties',
  templateUrl: './label-properties.component.html',
  styleUrls: ['./label-properties.component.scss']
})
export class LabelPropertiesComponent implements OnInit {

  @Input() data: any;

  constructor() {
   }

  ngOnInit(): void {
  }

}
