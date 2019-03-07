import {FormControl, AbstractControl} from '@angular/forms';
import { UtilsService } from '../service/utils/utils.service';
declare module '@angular/forms/src/model' {
    interface AbstractControl {
        denoteFieldValid(value: AbstractControl | FormControl): boolean;
        denoteFieldInvalid(value: AbstractControl | FormControl): boolean;
        showErrorMessageInField(value: AbstractControl | FormControl): boolean;
    }
}
// Note: `AbstractControl` adds, working before tried 

AbstractControl.prototype.denoteFieldValid = function(this: AbstractControl | FormControl): boolean { 
    return UtilsService.denoteFieldValid(this);
};

AbstractControl.prototype.denoteFieldInvalid = function(this: AbstractControl | FormControl): boolean { 
    return UtilsService.denoteFieldInvalid(this);
};

AbstractControl.prototype.showErrorMessageInField = function(this: AbstractControl | FormControl): boolean { 
    return UtilsService.showErrorMessageInField(this);
};