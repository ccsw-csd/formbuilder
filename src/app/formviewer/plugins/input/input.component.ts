import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-viewer-plugin-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class FormViewerPluginInputComponent implements OnInit {

  @Input() 
  data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
