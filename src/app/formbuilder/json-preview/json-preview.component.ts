import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JsonPreviewComponent implements OnInit {

  dataString: string = '';

  constructor(
    public dialogo: MatDialogRef<JsonPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataString = JSON.stringify(this.data, null, '\t');
  }

  close(): void {
    this.dialogo.close();
  }

}
