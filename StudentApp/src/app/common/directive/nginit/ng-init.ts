import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[ngInit]'
})
export class NgInit {
    // not working 
    @Input() ngInit;

    ngOnInit() {
        if (this.ngInit) {
            this.ngInit();
        }
    }
}
