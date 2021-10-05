import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-viewer-plugin-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class FormViewerPluginLabelComponent implements OnInit {

  @Input() 
  data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
