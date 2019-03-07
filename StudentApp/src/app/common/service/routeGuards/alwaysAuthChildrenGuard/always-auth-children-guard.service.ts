import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlwaysAuthChildrenGuardService implements CanActivateChild {

  constructor() { }


  canActivateChild() {
    //console.log("AlwaysAuthChildrenGuard <> 11111");
    return true;
    //return false;
  }
}
