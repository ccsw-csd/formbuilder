import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-viewer-plugin-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class FormViewerPluginTextareaComponent implements OnInit {

  @Input() data: any;
  @Input() model: any;

  constructor() { }

  ngOnInit(): void {
    if (this.data.name)
      this.model[this.data.name] = this.data.value;
  }

}
