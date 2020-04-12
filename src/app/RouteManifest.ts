import {Router} from '@angular/router';


class RouteDescriptor {


  navigate( router: Router ) {

    router.navigate( [`/${this.path}`]);
  }

  constructor(public path: string) {
  }

}



export class RouteManifest {

  static readonly AUDIO_LIBRARY = new RouteDescriptor('audio-library' );
  static readonly PLAYBACK_CONTROL = new RouteDescriptor('playback-control' );
  static readonly FILES = new RouteDescriptor('files' );
  static readonly PLAYLIST = new RouteDescriptor('playlist' );

}
