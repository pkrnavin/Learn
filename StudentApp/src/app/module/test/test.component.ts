import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/common/service/userService/user.service';
import { UtilsService } from 'src/app/common/service/utils/utils.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  inputChildValue: string = 'FIRST VALUE';

  /**
   * below value gets from route param 
   * 
   * @param route 
   */
  constructor(private route: ActivatedRoute, private userService: UserService) {
    //console.info('TestComponent <> constructor <> 11111111');
    /* commented, below not working, below for parent child routing  
    this.route.parent.params.subscribe(params => {
      console.info('1111 <> params: '+JSON.stringify(params));
    });*/

    //console.info('this.route.params: '+JSON.stringify(this.route.params));
    
    this.route.params.subscribe(params => {
      //console.info('2222 <> params: '+JSON.stringify(params));
    });
  }


  /**
   * - (1) to check values 
   */
  ngOnInit() {
    this.checkValues(); // (1)
  }


  /**
   * - (1) to check Utils function value isJSON 
   * - (2) to check JSON empty 
   * - (3) to check value is string 
   * - (4) to check value is number 
   * - (5) to check value is empty 
   */
  checkValues(): void {
    //this.checkIsJSON(); // (1)

    //this.checkEmptyJSON() // (2)

    //this.checkIsString(); // (3)

    //this.checkIsNumber(); // (4)

    //this.checkIsValueEmpty(); // (5)
  };

  /**
   * to check Utils function isJSON of value passing  
   */
  checkIsJSON(): void {
    console.info('checkIsJSON() <> number <> isJSON: '+UtilsService.isJSON(123));
    console.info('checkIsJSON() <> number string <> isJSON: '+UtilsService.isJSON('123'));
    console.info('checkIsJSON() <> string <> isJSON: '+UtilsService.isJSON('ABC'));
    console.info('checkIsJSON() <> boolean true <> isJSON: '+UtilsService.isJSON(true));
    console.info('checkIsJSON() <> boolean false <> isJSON: '+UtilsService.isJSON(false));
    console.info('checkIsJSON() <> array in string <> isJSON: '+UtilsService.isJSON('[1, 2, 3]'));
    console.info('checkIsJSON() <> array <> isJSON: '+UtilsService.isJSON([1, 2, 3]));
    console.info('checkIsJSON() <> JSON in string <> isJSON: '+UtilsService.isJSON('{"a": 123}'));
    console.info('checkIsJSON() <> JSON <> isJSON: '+UtilsService.isJSON({"b": 456}));
  };

  /**
   * to check isEmptyJSON 
   */
  checkEmptyJSON(): void {
    console.info('checkEmptyJSON() <> number <> isEmptyJSON: '+UtilsService.isEmptyJSON(123));
    console.info('checkEmptyJSON() <> JSON empty <> isEmptyJSON: '+UtilsService.isEmptyJSON({}));
    console.info('checkEmptyJSON() <> JSON string empty <> isEmptyJSON: '+UtilsService.isEmptyJSON('{}'));
    console.info('checkEmptyJSON() <> JSON in string <> isEmptyJSON: '+UtilsService.isEmptyJSON('{"a": 123}'));
    console.info('checkEmptyJSON() <> JSON <> isEmptyJSON: '+UtilsService.isEmptyJSON({"b": 456}));
    console.info('checkEmptyJSON() <> array empty <> isEmptyJSON: '+UtilsService.isEmptyJSON([]));
    console.info('checkEmptyJSON() <> array in string <> isEmptyJSON: '+UtilsService.isJSON('[1, 2, 3]'));
    console.info('checkEmptyJSON() <> array <> isEmptyJSON: '+UtilsService.isJSON([1, 2, 3]));
  };

  /**
   * to check value is string 
   */
  checkIsString(): void {
    console.info('checkIsString() <> number -ve <> isString: '+UtilsService.isString(-123));
    console.info('checkIsString() <> number 0 <> isString: '+UtilsService.isString(0));
    console.info('checkIsString() <> number <> isString: '+UtilsService.isString(123));
    console.info('checkIsString() <> number decimal <> isString: '+UtilsService.isString(123.111));
    console.info('checkIsString() <> boolean true <> isString: '+UtilsService.isString(true));
    console.info('checkIsString() <> boolean false <> isString: '+UtilsService.isString(false));
    console.info('checkIsString() <> boolean string true <> isString: '+UtilsService.isString('true'));
    console.info('checkIsString() <> boolean string false <> isString: '+UtilsService.isString('false'));
    console.info('checkIsString() <> string number <> isString: '+UtilsService.isString('123'));
    console.info('checkIsString() <> string <> isString: '+UtilsService.isString('ABC'));
    console.info('checkIsString() <> JSON empty <> isString: '+UtilsService.isString({}));
    console.info('checkIsString() <> JSON <> isString: '+UtilsService.isString({a: '123'}));
    console.info('checkIsString() <> JSON string <> isString: '+UtilsService.isString('{"a": 123}'));
    console.info('checkIsString() <> Array empty <> isString: '+UtilsService.isString([]));
    console.info('checkIsString() <> Array <> isString: '+UtilsService.isString([1, 2, 3]));
    console.info('checkIsString() <> Array string <> isString: '+UtilsService.isString('[1, 2, 3]'));
  };

  /**
   * to check value is number 
   */
  checkIsNumber(): void {
    console.info('checkIsNumber() <> number -ve <> isNumber: '+UtilsService.isNumber(-123));
    console.info('checkIsNumber() <> number 0 <> isNumber: '+UtilsService.isNumber(0));
    console.info('checkIsNumber() <> number <> isNumber: '+UtilsService.isNumber(123));
    console.info('checkIsNumber() <> number decimal <> isNumber: '+UtilsService.isNumber(123.111));
    console.info('checkIsNumber() <> boolean true <> isNumber: '+UtilsService.isNumber(true));
    console.info('checkIsNumber() <> boolean false <> isNumber: '+UtilsService.isNumber(false));
    console.info('checkIsNumber() <> boolean string true <> isNumber: '+UtilsService.isNumber('true'));
    console.info('checkIsNumber() <> boolean string false <> isNumber: '+UtilsService.isNumber('false'));
    console.info('checkIsNumber() <> string number <> isNumber: '+UtilsService.isNumber('123'));
    console.info('checkIsNumber() <> string <> isNumber: '+UtilsService.isNumber('ABC'));
    console.info('checkIsNumber() <> JSON empty <> isNumber: '+UtilsService.isNumber({}));
    console.info('checkIsNumber() <> JSON <> isNumber: '+UtilsService.isNumber({a: '123'}));
    console.info('checkIsNumber() <> JSON string <> isNumber: '+UtilsService.isNumber('{"a": 123}'));
    console.info('checkIsNumber() <> Array empty <> isNumber: '+UtilsService.isNumber([]));
    console.info('checkIsNumber() <> Array <> isNumber: '+UtilsService.isNumber([1, 2, 3]));
    console.info('checkIsNumber() <> Array string <> isNumber: '+UtilsService.isNumber('[1, 2, 3]'));
  };

  /**
   * to check value is empty 
   */
  checkIsValueEmpty() {
    console.info('checkIsValueEmpty() <> null <> isValueEmpty: '+UtilsService.isValueEmpty(null));
    console.info('checkIsValueEmpty() <> undefined <> isValueEmpty: '+UtilsService.isValueEmpty(undefined));
    console.info('checkIsValueEmpty() <> array empty <> isValueEmpty: '+UtilsService.isValueEmpty([]));
    console.info('checkIsValueEmpty() <> array numbers <> isValueEmpty: '+UtilsService.isValueEmpty([1, 2, 3]));
    console.info('checkIsValueEmpty() <> JSON empty <> isValueEmpty: '+UtilsService.isValueEmpty({}));
    console.info('checkIsValueEmpty() <> JSON value <> isValueEmpty: '+UtilsService.isValueEmpty({"a": 123}));
    console.info('checkIsValueEmpty() <> string empty <> isValueEmpty: '+UtilsService.isValueEmpty(''));
    console.info('checkIsValueEmpty() <> string <> isValueEmpty: '+UtilsService.isValueEmpty('123ABC'));
    console.info('checkIsValueEmpty() <> boolean true <> isValueEmpty: '+UtilsService.isValueEmpty(true));
    console.info('checkIsValueEmpty() <> boolean false <> isValueEmpty: '+UtilsService.isValueEmpty(false));
    console.info('checkIsValueEmpty() <> number 0 <> isValueEmpty: '+UtilsService.isValueEmpty(0));
    console.info('checkIsValueEmpty() <> number 1 <> isValueEmpty: '+UtilsService.isValueEmpty(1));
    console.info('checkIsValueEmpty() <> number <> isValueEmpty: '+UtilsService.isValueEmpty(123));
    console.info('checkIsValueEmpty() <> number -ve <> isValueEmpty: '+UtilsService.isValueEmpty(-123));
    console.info('checkIsValueEmpty() <> number decimal <> isValueEmpty: '+UtilsService.isValueEmpty(123.111));
  };
}
