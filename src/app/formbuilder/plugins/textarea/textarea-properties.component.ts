import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea-properties',
  templateUrl: './textarea-properties.component.html',
  styleUrls: ['./textarea-properties.component.scss']
})
export class TextareaPropertiesComponent implements OnInit {

  @Input() data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
