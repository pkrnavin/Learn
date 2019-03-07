import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  // error message to add in directive, to show; Note: custom attribute name `aemFormControl` added, as only `formControl` adds referes library field 
  @Input('aemFormControl') formControl: AbstractControl | FormControl;
  
  // TODO: array CustomMessages to add in directive  

  constructor() { }

  ngOnInit() {
  }


}
