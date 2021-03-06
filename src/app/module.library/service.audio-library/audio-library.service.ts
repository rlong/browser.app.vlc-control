import {Injectable, OnInit} from '@angular/core';
import {FileNode, IFileNode} from '../../model/vlc';
import {VlcContextService} from '../../service.vlc-context/vlc-context.service';
import {AngularIndexedDB} from '../../../lib/angular2-indexeddb/angular2-indexeddb';
import {ICategoryMeta} from '../../model/VlcPlayback';
import {LibrarySetupStats} from './LibrarySetupStats';
import {Command} from '../../../util/Command';


export type Album = string;
export type Artist = string;
export type Folder = string;
export type Genre = string;


export class IndexedDatum<T> {

  constructor( public index: number,
               public value: T ) {
  }

  artists: IndexedDatum<Artist>[] = [];

  addArtist( artist: IndexedDatum<Artist> ) {

    for( const candidate of this.artists ) {
      // already add ?
      if( artist === candidate ) {
        return;
      }
    }
    this.artists.push( artist );
  }
}


class IndexedData<T> {


  value: IndexedDatum<T>[] = [];
  indexesByValue: {} = {};

  constructor() {}


  get( value: string|null ): IndexedDatum<T>|null {

    if ( !value ) {
      return null;
    }

    let answer = this.indexesByValue[value];

    if ( answer ) {

      return answer;
    }

    answer = new IndexedDatum( this.value.length, value );
    this.value.push( answer );
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


export class AudioTrack {

  filename: string;
  title: string;
  // tslint:disable-next-line:variable-name
  track_number: number|null;

  album: IndexedDatum<Album>;
  artist: IndexedDatum<Artist>;
  genre: IndexedDatum<Genre>;
  folder: IndexedDatum<Folder>;


  get path() {

    return this.folder.value + '/' + this.filename;
  }


  static sortByTrackNumber( audioTracks: AudioTrack[] ): AudioTrack[] {

    const answer  = audioTracks.slice(0);
    answer.sort( (a, b) => {

      if( !a.track_number ) {

        if( b.track_number ) {
          return 1;
        }
        return 0; // both null
      } else {

        if( !b.track_number ) {

          return -1;
        } else  {

          return a.track_number - b.track_number;
        }
      }


    });
    return answer;

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

  constructor( audioLibrary: AudioLibrary, audioTrack: IAudioTrack ) {

    this.filename = audioTrack.meta.filename;
    this.title = audioTrack.meta.title;
    this.track_number = parseInt( audioTrack.meta.track_number, 10 );


    this.artist = audioLibrary.artists.get( audioTrack.meta.artist );
    this.album = audioLibrary.albums.get( audioTrack.meta.album );

    if( this.album && this.artist ) {

      this.album.addArtist( this.artist );
    }
    this.folder = audioLibrary.folders.get( AudioTrack.getFolder( audioTrack.file.path ));
    this.genre = audioLibrary.genres.get( audioTrack.meta.genre );
  }

}


export class AudioLibrary {

  albums = new IndexedData<Album>();
  artists = new IndexedData<Artist>();
  folders  = new IndexedData<Folder>();
  genres = new IndexedData<Genre>();


  audioTracks: AudioTrack[] = [];


  public add( track: IAudioTrack ) {

    this.audioTracks.push( new AudioTrack( this, track ));
  }

  findAlbumsByArtist(artist: IndexedDatum<Artist> ): IndexedDatum<Album>[] {

    const albums = this.artists.value.slice(0);

    for( const track of this.audioTracks ) {

      if( artist === track.artist ) {

        // null out the matching album
        albums[track.album.index] = null;
      }
    }

    const answer: IndexedDatum<Album>[] = [];
    for( const index in albums ) {

      if( !albums[index] ) {

        answer.push( this.albums.value[index] );
      }
    }

    return answer;


  }


  findAlbumsByGenre( genre: IndexedDatum<Genre> ): IndexedDatum<Album>[] {

    const albums = this.albums.value.slice(0);

    for( const track of this.audioTracks ) {

      if( genre === track.genre ) {

        // null out the matching album
        albums[track.album.index] = null;
      }
    }

    const answer: IndexedDatum<Album>[] = [];
    for( const index in albums ) {

      if( !albums[index] ) {

        answer.push( this.albums.value[index] );
      }
    }

    return answer;
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
      if ( file.name === candidate.filename ) {
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

  initialising = new Command<void>();

  db: AngularIndexedDB = null;
  private aidb: AngularIndexedDB = null;
  audioLibrary: AudioLibrary = new AudioLibrary();


  private loadLibrary( initialising: Command<void>) {

    const start = new Date();

    this.aidb.openCursor(AudioLibraryService.TRACK, (evt) => {
      const cursor = (evt.target as any).result;
      if (cursor) {

        const track: IAudioTrack = cursor.value;
        this.audioLibrary.add( track );

        cursor.continue();
      } else {

        const elapsed = new Date().getTime() - start.getTime();
        console.log( [this], 'elapsed', elapsed );
        console.log( [this], 'this.audioLibrary.audioTracks.length', this.audioLibrary.audioTracks.length );
        initialising.resolve();
      }
    });

  }


  async init() {


    if( !this.initialising ) {
      this.initialising = new Command<void>();
    }

    this.aidb = new AngularIndexedDB('audio-library', AudioLibraryService.DB_VERSION);

    await this.aidb.openDatabase(AudioLibraryService.DB_VERSION, (changeEvent: any) => {

      console.log([this], 'asyncInit', 'onupgradeneeded', changeEvent);

      const idb: IDBDatabase = changeEvent.currentTarget.result;

      idb.createObjectStore( AudioLibraryService.TRACK, {autoIncrement: true});

    });

    this.loadLibrary( this.initialising );
    this.initialising = null;
  }

  async getAudioFiles( stats: LibrarySetupStats ): Promise<FileNode[]> {

    const answer: FileNode[] = [];

    const pendingFolders: string[] = ['/Users/lrlong/Music/iTunes/iTunes Music/'];
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

          if ( -1 !== file.value.path.indexOf( ',')  ) {
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
      const categoryMeta: ICategoryMeta|null = await this.getMeta( audioFile );

      const track: IAudioTrack = {

        file: audioFile.value,
        meta: categoryMeta,
      };

      await this.aidb.add( AudioLibraryService.TRACK, track );
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


    try {

      await this.vlc.in_play( audioFile.value.path );
    } catch (e) {
      console.error( e );
      return null;
    }

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


  constructor( private vlc: VlcContextService) {

    this.init();
  }
}
