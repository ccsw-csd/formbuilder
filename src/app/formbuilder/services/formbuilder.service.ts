import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { formMetadata } from '../plugin-config';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private http: HttpClient) { }


  public loadFormMetadata(id: number): Observable<any>{

    return of(formMetadata);
  }


}
