import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestDataLoaderService {

  constructor(private http: HttpClient) { }


  public loadData(url: string, method: string, params?: any): Observable<any[]>{

    if (method == 'GET')
      return this.http.get<any[]>(url);

    return null;
  }
}
