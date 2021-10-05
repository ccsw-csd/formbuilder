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

}
