import {Router} from '@angular/router';


export class PageHomeRoute {

  public static readonly PATH = 'home';

  static navigate( router: Router ) {

    router.navigate( [`/${PageHomeRoute.PATH}`]);
  }

}
