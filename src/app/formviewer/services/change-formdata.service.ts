import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventData } from 'src/app/core/model/EventData';

@Injectable({
  providedIn: 'root'
})
export class ChangeFormDataService {

  private eventSource = new Subject<EventData>();

  eventSourceObservable$ = this.eventSource.asObservable();

  sendEvent(data: any, senderId: string, targetId?: string) : void {
    this.eventSource.next(new EventData(data, senderId, targetId));
  }


}
