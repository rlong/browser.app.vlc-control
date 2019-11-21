import {Router} from '@angular/router';


export class PageStylingsRoute {


  public static readonly PATH = 'stylings';

  static navigate( router: Router ) {

    router.navigate( [`/${PageStylingsRoute.PATH}`]);
  }

}
