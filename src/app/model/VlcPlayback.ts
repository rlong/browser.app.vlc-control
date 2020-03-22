import {IAudioFilters, IInformation, IVideoEffects} from './vlc';
import {BaseReference} from './BaseReference';


export interface ICategory {

  meta: ICategoryMeta;
}

export interface ICategoryMeta {

  album?: string;
  artist?: string;
  artwork_url?: string;
  date?: string;
  description?: string;
  encoded_by?: string;
  filename?: string;
  genre?: string;
  title?: string;
  track_number?: string;
  track_total?: string;
}

export class CategoryMetaReference {

  date: number;

  // tslint:disable-next-line:variable-name
  track_number: number;

  // tslint:disable-next-line:variable-name
  track_total: number;

  constructor(public value: ICategoryMeta) {

    this.date = CategoryMetaReference.getNumber(value.date);
    this.track_number = CategoryMetaReference.getNumber(value.track_number);
    this.track_total = CategoryMetaReference.getNumber(value.track_total);
  }

  private static getNumber(value: any): number | null {

    if ('number' === typeof value) {
      return value;
    }

    if ('string' === typeof value) {

      if (0 === value.length) {
        return null;
      }

      const answer = parseInt(value, 10);
      if (isNaN(answer)) {

        console.error('CategoryMetaReference', 'getNumber', 'isNaN( answer )', value);
        return null;
      }

      return answer;
    }

    // unhandled type ...
    return null;
  }


}

export interface IStatus {

  apiversion: number;
  audiodelay: number;
  audiofilters: IAudioFilters;
  currentplid: number;
  equalizer: any[];
  fullscreen: boolean;
  information?: IInformation;
  length: number;
  loop: boolean;
  position: number;
  random: number;
  rate: number;
  repeat: boolean;
  state: string;
  subtitledelay: number;
  time: number;
  videoeffects: IVideoEffects;
  version: string;
  volume: number;

}

export class StatusReference extends BaseReference<IStatus> {


  public isPlaying = false;
  public isPaused = false;
  public volumePercentage: number;


  onSetValue(value: IStatus | null) {

    // console.log( 'StatusReference.onSetValue', value );

    if (this.value.state === 'playing') {

      this.isPlaying = true;
    } else if (this.value.state === 'paused') {

      this.isPaused = true;
    }

    this.volumePercentage = Math.round(100 * (this.value.volume / 320));
  }


  constructor(value: IStatus) {

    super(value);
    // if (value) {
    //
    //   this.value = value;
    // }
  }

}

export interface IPlaybackControl {

  playPause(): Promise<StatusReference>;
  playlistPrevious(): Promise<StatusReference>;
  toggleFullScreen(): Promise<StatusReference>;
  playlistNext(): Promise<StatusReference>;
  skipBackward(delta: number): Promise<StatusReference>;
  skipForward(delta: number): Promise<StatusReference>;
  setVolumeAsPercentage( volumeAsPercentage: number ): Promise<StatusReference>;
}
