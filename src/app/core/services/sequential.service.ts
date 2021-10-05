import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequentialService {
  private SEQUENTIAL_ID : number = 1;


  reset() : void {
    this.SEQUENTIAL_ID = 1;
  }


  getNextValue() : number {    
    return this.SEQUENTIAL_ID++;
  }


}
