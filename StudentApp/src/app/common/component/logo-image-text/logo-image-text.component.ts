import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo-image-text',
  templateUrl: './logo-image-text.component.html',
  styleUrls: ['./logo-image-text.component.css']
})
export class LogoImageTextComponent implements OnInit {

  joLogoClass: any = {};
  /* below to set, in logo image, text; of given key, to set in respective element; default to sets;
   *   in elements to set, the element's has css class given in below key 
   * Note: of below `angular.extend` overrides of css class value given in `jocustomClass` 
  */
  joDefaultClass = {
    'logoImageText': '',
    'image': 'imageLg',
    'text': 'textLg'
  };
  @Input('customClass') joCustomClass: any;

  constructor() { }

  /**
   * logo css class to override default from attribute given values 
   */
  ngOnInit() {
    //console.info('LogoImageTextComponent <> 11111111');
    //console.info('1111 <> this.joLogoClass <> '+JSON.stringify(this.joLogoClass));

    Object.assign(this.joLogoClass, this.joDefaultClass, this.joCustomClass);

    //console.info('22222 <> this.joLogoClass <> '+JSON.stringify(this.joLogoClass));
  }

}
