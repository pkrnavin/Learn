import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  /**
   * to check value is JSON 
   * 
   * @param item 
   */
  public static isJSON(item): boolean {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
      item = JSON.parse(item);
    } catch(e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  };

  /**
   * to check value is empty json 
   * 
   * @param obj 
   */
  public static isEmptyJSON(obj): boolean {
    if ( ! UtilsService.isJSON(obj) ) return false;
    
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  };

  /**
   * to check value is string 
   * 
   * @param val 
   */
  public static isString(val): boolean {
    return "string" == typeof val || val instanceof String;
  };
  
  /**
   * to check value is number 
   * 
   * @param val 
   */
  public static isNumber(val): boolean {
    return isFinite(val) && +val === val;
  };
  
  /**
   * to check value empty 
   * Note: boolean, number not adds, as value available 
   * TODO: to checking value `true`, `false`, `0`, `1`, `123` (ie. boolean, number) to pass 
   * 
   * @param val 
   */
  public static isValueEmpty(val: any): boolean {
    return val === null || val === undefined || (Array.isArray(val) && val.length === 0) || (UtilsService.isJSON(val) && UtilsService.isEmptyJSON(val)) || (UtilsService.isString(val) && val.length === 0);
  };
  
  /**
   * to get as `HttpParams` from JSON, in ajax call `POST` to send params, 
   *  from JSON key as `paramName`, value adds 
   *  
   * @param joParamsData 
   */
  public static getAsHttpParams(joParamsData): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    for(var keyParamName in joParamsData) {
      //console.info('getAsHttpParams <> keyParamName: '+keyParamName+' <> joParamsData[keyParamName]: '+joParamsData[keyParamName]);
      httpParams = httpParams.set(keyParamName, joParamsData[keyParamName]);
      //httpParams = httpParams.append(keyParamName, joParamsData[keyParamName]);
    }
    
    return httpParams;
  };
  
  /**
   * to get default datepicker options 
   */
  public static getDatepickerDefaultConfig(): any {
    let bsConfig: Partial<BsDatepickerConfig>;
    bsConfig = { dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, minMode: 'day' };  //  minDate: new Date(2017, 7)
    return bsConfig;
  };

  /**
   * to get datepicker options, overrides default 
   * @param joDatepickerOptions 
   */
  getDatepickerOptions(joDatepickerOptions: any): any {
    let bsConfig: Partial<BsDatepickerConfig>;
    bsConfig = Object.assign({}, UtilsService.getDatepickerDefaultConfig(), joDatepickerOptions);
    //console.info('getDatepickerOptions <> bsConfig: '+JSON.stringify(bsConfig));
    return bsConfig;
  };

  /**
   * denote field valid 
   * 
   * @param formControl 
   */
  public static denoteFieldValid(formControl: AbstractControl | FormControl) {
    return formControl.valid;
  };
  
  /**
   * denote field invalid 
   * 
   * @param formControl 
   */
  public static denoteFieldInvalid(formControl: AbstractControl | FormControl) {
    return formControl.invalid;
  };
  
  /**
   * show error message in field 
   * 
   * @param formControl 
   */
  public static showErrorMessageInField(formControl: AbstractControl | FormControl) {
    return formControl.errors && formControl.dirty;
  };

  public static getSelectedDatumFromArrayInJSON(aryData, key, value): any {
    var joDatum, joRtnDatum;
    
    //console.info('getSelectedDatumFromArrayInJSON <> aryData: '+JSON.stringify(aryData)+' <> key: '+key+' <> value: '+value);
    
    for(var i = 0; i < aryData.length; i = i + 1) {
      joDatum = aryData[i];
      //console.info('i: '+i+' <> joDatum: '+JSON.stringify(joDatum));
      
      if ( joDatum[key] === value) {
        //console.info('getSelectedDatumFromArrayInJSON <> found');
        joRtnDatum = joDatum;
        break;
      }
    }
    
    return joRtnDatum;
  }
}