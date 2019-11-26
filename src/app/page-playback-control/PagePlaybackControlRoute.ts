import {Router} from '@angular/router';


export class PagePlaybackControlRoute {

  public static readonly PATH = 'playback-control';

  static navigate( router: Router ) {

    router.navigate( [`/${PagePlaybackControlRoute.PATH}`]);
  }

}
