import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  public static readonly logOutAction = 'logout_action';
  private static emitters: { [id: string]: EventEmitter<any> } = {};

  constructor() { }

  static exist(id: string): boolean{
    if(!this.emitters[id])
      return false;
    return true;
  }

  static get<T>(id: string): EventEmitter<T>{
    if(!this.exist(id))
      this.emitters[id] = new EventEmitter<T>();
    return this.emitters[id];
  }

  static delete(id: string): void {
    if(this.exist(id))
      delete this.emitters[id]
  }

}
