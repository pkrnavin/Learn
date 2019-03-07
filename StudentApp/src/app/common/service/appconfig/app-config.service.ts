import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public static UI_SERVICE_URL: string = environment.UI_SERVICE_URL;

  constructor() { }

  
}
