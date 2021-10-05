import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-viewer-plugin-void',
  templateUrl: './void.component.html',
  styleUrls: ['./void.component.scss']
})
export class FormViewerPluginVoidComponent implements OnInit {

  @Input() 
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
