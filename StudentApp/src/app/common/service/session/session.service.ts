import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  /* `sessionStorage` to set value in browser tab, 
   *    the values available in the tab only, 
   *    same application URL in near tab(s) value not available
  */
  
  set(key,value): void {
    sessionStorage.setItem(key, value);
  };

  get(key):any {
    return sessionStorage.getItem(key);
  };

  destroy(key): void {
    sessionStorage.removeItem(key);
  };
}
