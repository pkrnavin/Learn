import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {

  // from link adds `https://stackoverflow.com/questions/37390663/there-is-no-ng-init-for-angular2` 

  @Input()
  set appNgInit(context: any) {
    this.context.$implicit = this.context.appNgInit = context;
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }

  context: { $implicit?: any, appNgInit?: any } = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}
}
