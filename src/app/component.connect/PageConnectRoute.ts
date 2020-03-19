import {Router} from '@angular/router';


export class PageConnectRoute {


  public static readonly PATH = '';

  static navigate( router: Router ) {

    router.navigate( [`/${PageConnectRoute.PATH}`]);
  }

}
