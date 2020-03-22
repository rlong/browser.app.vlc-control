import {IPlaybackControl, StatusReference} from '../../model/VlcPlayback';


export class MockPlayback implements IPlaybackControl {

  status: StatusReference = null;

  playPause(): Promise<StatusReference> {
    console.log( 'MockPlayback.playPause' );
    return Promise.resolve( this.status );
  }

  playlistNext(): Promise<StatusReference> {
    console.log( 'MockPlayback.playlistNext' );
    return Promise.resolve( this.status );
  }

  playlistPrevious(): Promise<StatusReference> {
    console.log( 'MockPlayback.playlistPrevious' );
    return Promise.resolve( this.status );
  }

  skipBackward(delta: number): Promise<StatusReference> {
    console.log( 'MockPlayback.skipBackward' );
    return Promise.resolve( this.status );
  }

  skipForward(delta: number): Promise<StatusReference> {
    console.log( 'MockPlayback.skipForward' );
    return Promise.resolve( this.status );
  }

  toggleFullScreen(): Promise<StatusReference> {
    console.log( 'MockPlayback.toggleFullScreen' );
    return Promise.resolve( this.status );
  }

  setVolumeAsPercentage( volumeAsPercentage: number ): Promise<StatusReference> {
    console.log( 'MockPlayback.setVolumeAsPercentage' );
    return Promise.resolve( this.status );
  }

  constructor() {

    const statusValue = `{
  "fullscreen":0,
  "audiodelay":0,
  "apiversion":3,
  "currentplid":-1,
  "time":0,
  "volume":118,
  "length":0,
  "random":false,
  "audiofilters":{
    "filter_0":""
  },
  "rate":1,
  "videoeffects":{
    "hue":0,
    "saturation":1,
    "contrast":1,
    "brightness":1,
    "gamma":1
  },
  "state":"stopped",
  "loop":false,
  "version":"3.0.3 Vetinari",
  "position":0,
  "repeat":false,
  "subtitledelay":0,
  "equalizer":[]
}`;
    this.status = new StatusReference( JSON.parse( statusValue ));
  }
}


