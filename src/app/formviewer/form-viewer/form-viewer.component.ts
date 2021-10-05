import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {

  formData: any = {};
  dataString: string = '';

  constructor(
    public dialogo: MatDialogRef<FormViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataString = JSON.stringify(this.data, null, '\t');
  }

  close(): void {
    this.dialogo.close();
  }
}
