import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {VlcProvider} from "../vlc/vlc";
import {AngularIndexedDB} from "angular2-indexeddb/angular2-indexeddb";
import {FileNode, ICategoryMeta, IFileNode} from "../../model/vlc";




class ReferenceValue {

  constructor( public index: number, public value: string ) {}
}

class ReferenceData {


  values: ReferenceValue[] = [];
  indexesByValue: {} = {};

  constructor() {}


  get( value: string|null ): ReferenceValue|null {

    if( !value ) {
      return null;
    }

    let answer = this.indexesByValue[value];

    if( answer ) {

      return answer;
    }

    answer = new ReferenceValue( this.values.length, value );
    this.values.push( answer );
    this.indexesByValue[value] = answer;

    return answer;
  }

  contains( value: string ): boolean {

    let answer = this.indexesByValue[value];

    if( answer ) {

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

    if( lastSlash < lastBackSlash ) {
      lastSlash = lastBackSlash;
    }

    return path.substr( 0, lastSlash );
  }

}


export class AudioLibrary {

  albums: ReferenceData = new ReferenceData();
  folders: ReferenceData = new ReferenceData();

  tracks: AudioTrack[] = [];


  public add( track: IAudioTrack ) {

    this.tracks.push( new AudioTrack( this, track ));
  }



  getTracksInFolder( folder: string ): AudioTrack[] {

    if( !this.folders.contains( folder) ) {

      return [];
    }

  }

  containsFile( file: IFileNode ): boolean {


    const folderPath = AudioTrack.getFolder( file.path );

    if( !this.folders.contains( folderPath) ) {

      return false;
    }


    const targetFolder = this.folders.get( folderPath );
    const filesInFolder = this.tracks.filter( (candidate) => candidate.folder == targetFolder);


    for( let candidate of filesInFolder ) {
      if( file.name == candidate.file_name ) {
        return true;
      }
    }

    return false;
  }

}


/*
*/
@Injectable()
export class AudioLibraryProvider {

  private static readonly TRACK = "track";

  db: AngularIndexedDB = null;
  private aidb: AngularIndexedDB = null;
  audioLibrary: AudioLibrary = new AudioLibrary();

  constructor( private vlc: VlcProvider ) {

    this.asyncInit();
  }



  async loadLibrary() {

    const answer = new Promise( (resolve, reject) => {

      this.aidb.openCursor(AudioLibraryProvider.TRACK, (evt) => {
        var cursor = (<any>evt.target).result;
        if(cursor) {

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


      console.log([this], "asyncInit", "onupgradeneeded", changeEvent);

      const idb: IDBDatabase = changeEvent.currentTarget.result;

      idb.createObjectStore( AudioLibraryProvider.TRACK, {autoIncrement: true});

    });

    this.loadLibrary();

  }

  async loadFolder( pendingFolders: string[] = ["/Users/lrlong/Music/iTunes/iTunes Music/Akira"] ) {

    while(  0 != pendingFolders.length ) {

      const pendingFolder = pendingFolders.pop();
      console.log( [this], 'loadFolder', pendingFolder );

      const files: FileNode[] = await this.vlc.browse( pendingFolder );


      for( let file of files ) {

        if( file.isFile ) {

          // has it been already added ?
          if( this.audioLibrary.containsFile( file.value )) {

            // TODO: fix finding duplicates
            // TODO: clear playlist after loading folder
            console.debug( [this], 'loadFolder', 'already added', file );
            continue;
          }

          if( file.value.name.endsWith( ".mp3" )) {


            const categoryMeta: ICategoryMeta = await this.getMeta( file.value.path, file.value.name );

            const track: IAudioTrack = {

              file: file.value,
              meta: categoryMeta,
            };


            this.aidb.add( AudioLibraryProvider.TRACK, track );
            this.audioLibrary.add( track );

            // return;

          } else {

            console.debug( [this], 'loadFolder', `skipping '${file.value.name}'` );
          }

        } else if( file.isDirectory ) {

          pendingFolders.push( file.value.path );
        }
      }



    }
  }

  // vvv https://stackoverflow.com/questions/37764665/typescript-sleep

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // ^^^ https://stackoverflow.com/questions/37764665/typescript-sleep


  async getMeta( trackPath: string, trackName: string ): Promise<ICategoryMeta|null> {

    await this.vlc.in_play( trackPath );

    let dataLoaded = false;
    let retryCount = 5; //
    while( !dataLoaded && 0 != retryCount ) {

      await this.delay( 250 );
      let status = await this.vlc.getStatus( true );

      if( status.stateIsPlaying ) {

        if( status.value.information && status.value.information.category && status.value.information.category.meta ) {

          const meta: ICategoryMeta = status.value.information.category.meta;
          if( meta.filename == trackName ) {

            return meta;
          }
        }
      }

      retryCount--;
    }

    console.warn( [this], 'loadMeta', retryCount, trackPath, trackName );
    return null;

  }

}
