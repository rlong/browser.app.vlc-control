import {Injectable, OnInit} from '@angular/core';
import {FileNode, IFileNode} from '../../model/vlc';
import {VlcService} from '../../service.vlc/vlc.service';
import {AngularIndexedDB} from '../../../lib/angular2-indexeddb/angular2-indexeddb';
import {ICategoryMeta} from '../../model/VlcPlayback';
import {LibrarySetupStats} from './LibrarySetupStats';


class IndexedDatum {

  constructor( public index: number, public value: string ) {}
}


class IndexedData {


  values: IndexedDatum[] = [];
  indexesByValue: {} = {};

  constructor() {}


  get( value: string|null ): IndexedDatum|null {

    if ( !value ) {
      return null;
    }

    let answer = this.indexesByValue[value];

    if ( answer ) {

      return answer;
    }

    answer = new IndexedDatum( this.values.length, value );
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

  album: IndexedDatum;
  artist: IndexedDatum;
  folder: IndexedDatum;
  genre: IndexedDatum;


  public static getFolder( path: string ) {

    const lastForwardSlash = path.lastIndexOf( '/');
    const lastBackSlash = path.lastIndexOf( '\\');

    let lastSlash =  lastForwardSlash;

    if ( lastSlash < lastBackSlash ) {
      lastSlash = lastBackSlash;
    }

    return path.substr( 0, lastSlash );
  }

  constructor( audioLibrary: AudioLibrary, audioTrack: IAudioTrack ) {

    this.file_name = audioTrack.file.name;

    this.album = audioLibrary.albums.get( audioTrack.meta.album );
    this.artist = audioLibrary.artists.get( audioTrack.meta.artist );
    this.folder = audioLibrary.folders.get( AudioTrack.getFolder( audioTrack.file.path ));
    this.genre = audioLibrary.genres.get( audioTrack.meta.genre );
  }

}


export class AudioLibrary {

  albums: IndexedData = new IndexedData();
  folders: IndexedData = new IndexedData();
  genres: IndexedData = new IndexedData();
  artists: IndexedData = new IndexedData();


  audioTracks: AudioTrack[] = [];


  public add( track: IAudioTrack ) {

    this.audioTracks.push( new AudioTrack( this, track ));
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
    const filesInFolder = this.audioTracks.filter( (candidate) => candidate.folder === targetFolder);


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

  static readonly DB_VERSION = 12;

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


  async init() {

    this.aidb = new AngularIndexedDB('audio-library', AudioLibraryService.DB_VERSION);

    await this.aidb.openDatabase(AudioLibraryService.DB_VERSION, (changeEvent: any) => {

      console.log([this], 'asyncInit', 'onupgradeneeded', changeEvent);

      const idb: IDBDatabase = changeEvent.currentTarget.result;

      idb.createObjectStore( AudioLibraryService.TRACK, {autoIncrement: true});

    });

    this.loadLibrary();
  }

  async getAudioFiles( stats: LibrarySetupStats ): Promise<FileNode[]> {

    const answer: FileNode[] = [];

    const pendingFolders: string[] = ['/Users/lrlong/Music/iTunes/iTunes Music/Barenaked Ladies'];
    while (  0 !== pendingFolders.length ) {

      const pendingFolder = pendingFolders.pop();
      console.log([this], 'loadFolder', pendingFolder);

      const files: FileNode[] = await this.vlc.browse( pendingFolder );

      for ( const file of files ) {

        if ( file.isFile ) {

          stats.filesFound++;

          if ( file.value.name.endsWith( '.mp3' )) {

            stats.audioFilesFound++;
            answer.push( file );
          }

        } else if ( file.isDirectory ) {

          if ( '..' === file.value.name ) {
            continue;
          }

          stats.foldersFound++;
          pendingFolders.push( file.value.path );
        }
      }
    }
    return answer;
  }


  async setupLibrary( audioFiles: FileNode[], stats: LibrarySetupStats ) {

    await this.vlc.pl_empty();

    let playlistSize = 0;
    for ( const audioFile of audioFiles ) {

      // const categoryMeta: ICategoryMeta = await this.getMeta( audioFile.value.path, audioFile.value.name );
      const categoryMeta: ICategoryMeta = await this.getMeta( audioFile );

      const track: IAudioTrack = {

        file: audioFile.value,
        meta: categoryMeta,
      };

      this.aidb.add( AudioLibraryService.TRACK, track );
      this.audioLibrary.add( track );
      playlistSize++;

      if ( 10 === playlistSize ) {

        await this.vlc.pl_empty();
        playlistSize = 0;
      }

    }
    await this.vlc.pl_empty();

  }


  // vvv https://stackoverflow.com/questions/37764665/typescript-sleep

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // ^^^ https://stackoverflow.com/questions/37764665/typescript-sleep


  async getMeta( audioFile: FileNode ): Promise<ICategoryMeta|null> {


    await this.vlc.in_play( audioFile.value.path );

    let retryCount = 5;
    while ( 0 !== retryCount ) {

      await this.delay( 250 );
      const status = await this.vlc.getStatus( true );

      if ( status.value.information && status.value.information.category && status.value.information.category.meta ) {

        const meta: ICategoryMeta = status.value.information.category.meta;
        if ( meta.filename === audioFile.value.name ) {

          return meta;
        }
      }


      retryCount--;
    }

    console.warn( [this], 'loadMeta', retryCount, audioFile.value.path, audioFile.value.name );
    return null;

  }


  constructor( private vlc: VlcService) {

    this.init();
  }
}
