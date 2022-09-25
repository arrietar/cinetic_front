import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private code:any
  private message:any;

  constructor() { }

  createError(code:any, message:any){
    this.code = code;
    this.message = message
  }

  getCode(){
    return this.code;
  }

  getMessage(){
    return this.message;
  }
}
