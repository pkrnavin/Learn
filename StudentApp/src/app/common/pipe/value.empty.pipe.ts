import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../service/utils/utils.service';


@Pipe({
  name: "isValueEmpty"
})
export class ValueEmptyPipe implements PipeTransform {
    
    /**
     * to check value is empty, in template the function to add, bleow add, before tried 
     * 
     * @param value 
     */
    transform(value: any): boolean {
        return UtilsService.isValueEmpty(value);
    };
}