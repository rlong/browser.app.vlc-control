import {Router} from '@angular/router';


class RouteDescriptor {


  navigate( router: Router ) {

    router.navigate( [`/${this.path}`]);
  }

  constructor(public path: string) {
  }


}



export class RouteDescriptors {

  static home = new RouteDescriptor('home' );

}
