import { Injectable } from '@angular/core';
import {FileNode, ICategoryMeta, IFileNode} from '../model/vlc';
import {AngularIndexedDB} from 'angular2-indexeddb/angular2-indexeddb';
import {VlcService} from '../service.vlc/vlc.service';




class ReferenceValue {

  constructor( public index: number, public value: string ) {}
}

class ReferenceData {


  values: ReferenceValue[] = [];
  indexesByValue: {} = {};

  constructor() {}


  get( value: string|null ): ReferenceValue|null {

    if ( !value ) {
      return null;
    }

    let answer = this.indexesByValue[value];

    if ( answer ) {

      return answer;
    }

    answer = new ReferenceValue( this.values.length, value );
    this.values.push( answer );
    this.indexesByValue[value] = answer;

    return answer;
  }

  contains( value: string ): boolean {

    const answer = this.indexesByValue[value];

    if ( answer ) {

      return true;
    }

    return false;
  }

}



interface IAudioTrack {


  file: IFileNode;
  meta: ICategoryMeta;

}


class AudioTrack {

  file_name: string;
  title: string;

  album: ReferenceValue;
  folder: ReferenceValue;

  constructor( audioLibrary: AudioLibrary, audioTrack: IAudioTrack ) {

    this.file_name = audioTrack.file.name;

    // this.path = audioTrack.path;
    // this.size = audioTrack.file.size;

    this.album = audioLibrary.albums.get( audioTrack.meta.album );
    this.folder = audioLibrary.folders.get( AudioTrack.getFolder( audioTrack.file.path ));
  }

  public static getFolder( path: string ) {

    const lastForwardSlash = path.lastIndexOf( '/');
    const lastBackSlash = path.lastIndexOf( '\\');

    let lastSlash =  lastForwardSlash;

    if ( lastSlash < lastBackSlash ) {
      lastSlash = lastBackSlash;
    }

    return path.substr( 0, lastSlash );
  }

}


export class AudioLibrary {

  albums: ReferenceData = new ReferenceData();
  folders: ReferenceData = new ReferenceData();
  // TODO: add genre, artist


  tracks: AudioTrack[] = [];


  public add( track: IAudioTrack ) {

    this.tracks.push( new AudioTrack( this, track ));
  }



  getTracksInFolder( folder: string ): AudioTrack[] {

    if ( !this.folders.contains( folder) ) {

      return [];
    }

  }

  containsFile( file: IFileNode ): boolean {


    const folderPath = AudioTrack.getFolder( file.path );

    if ( !this.folders.contains( folderPath) ) {

      return false;
    }


    const targetFolder = this.folders.get( folderPath );
    const filesInFolder = this.tracks.filter( (candidate) => candidate.folder === targetFolder);


    for ( const candidate of filesInFolder ) {
      if ( file.name === candidate.file_name ) {
        return true;
      }
    }

    return false;
  }

}


@Injectable({
  providedIn: 'root'
})
export class AudioLibraryService {



  private static readonly TRACK = 'track';

  db: AngularIndexedDB = null;
  private aidb: AngularIndexedDB = null;
  audioLibrary: AudioLibrary = new AudioLibrary();



  async loadLibrary() {

    const answer = new Promise( (resolve, reject) => {

      this.aidb.openCursor(AudioLibraryService.TRACK, (evt) => {
        const cursor = (evt.target as any).result;
        if (cursor) {

          const track: IAudioTrack = cursor.value;
          this.audioLibrary.add( track );

          cursor.continue();
        } else {

          console.log( [this], 'loadLibrary', this.audioLibrary );
          resolve();
        }
      });
    });

    return answer;
  }


  async asyncInit() {

    const version = 11;
    this.aidb = new AngularIndexedDB('audio-library', version);

    await this.aidb.openDatabase(version, (changeEvent: any) => {


      console.log([this], 'asyncInit', 'onupgradeneeded', changeEvent);

      const idb: IDBDatabase = changeEvent.currentTarget.result;

      idb.createObjectStore( AudioLibraryService.TRACK, {autoIncrement: true});

    });

    this.loadLibrary();

  }

  async loadFolder( pendingFolders: string[] = ['/Users/lrlong/Music/iTunes/iTunes Music/Akira'] ) {

    while (  0 != pendingFolders.length ) {

      const pendingFolder = pendingFolders.pop();
      console.log( [this], 'loadFolder', pendingFolder );

      const files: FileNode[] = await this.vlc.browse( pendingFolder );

      for ( const file of files ) {

        if ( file.isFile ) {

          // has it been already added ?
          if ( this.audioLibrary.containsFile( file.value )) {

            console.log( [this], 'loadFolder', 'already added', file );
            continue;
          }

          if ( file.value.name.endsWith( '.mp3' )) {


            const categoryMeta: ICategoryMeta = await this.getMeta( file.value.path, file.value.name );

            const track: IAudioTrack = {

              file: file.value,
              meta: categoryMeta,
            };


            this.aidb.add( AudioLibraryService.TRACK, track );
            this.audioLibrary.add( track );

            // return;

          } else {

            console.log( [this], 'loadFolder', `skipping '${file.value.name}'` );
          }

        } else if ( file.isDirectory ) {

          pendingFolders.push( file.value.path );
        }
      }
      this.vlc.pl_empty();



    }
  }

  // vvv https://stackoverflow.com/questions/37764665/typescript-sleep

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // ^^^ https://stackoverflow.com/questions/37764665/typescript-sleep


  async getMeta( trackPath: string, trackName: string ): Promise<ICategoryMeta|null> {

    await this.vlc.in_play( trackPath );

    const dataLoaded = false;
    let retryCount = 5; //
    while ( !dataLoaded && 0 !== retryCount ) {

      await this.delay( 250 );
      const status = await this.vlc.getStatus( true );

      if ( status.stateIsPlaying ) {

        if ( status.value.information && status.value.information.category && status.value.information.category.meta ) {

          const meta: ICategoryMeta = status.value.information.category.meta;
          if ( meta.filename === trackName ) {

            return meta;
          }
        }
      }

      retryCount--;
    }

    console.warn( [this], 'loadMeta', retryCount, trackPath, trackName );
    return null;

  }


  constructor( private vlc: VlcService) {

    this.asyncInit();
  }
}
