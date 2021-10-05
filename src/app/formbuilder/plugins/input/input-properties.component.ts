import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-properties',
  templateUrl: './input-properties.component.html',
  styleUrls: ['./input-properties.component.scss']
})
export class InputPropertiesComponent implements OnInit {

  @Input() data: any;
  @Input() elementData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
