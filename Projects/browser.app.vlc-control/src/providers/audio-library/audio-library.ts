import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {VlcProvider} from "../vlc/vlc";
import {AngularIndexedDB} from "angular2-indexeddb/angular2-indexeddb";
import {FileNode} from "../../model/vlc";



interface IAudioTrack {


  name: string;
  path: string;
  size: number;

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

/*
*/
@Injectable()
export class AudioLibraryProvider {


  db;

  // private static readonly ALBUM = "album";
  private static readonly TRACK = "track";

  constructor( private vlc: VlcProvider ) {

    this.asyncInit();
  }

  async asyncInit() {


    this.db = new AngularIndexedDB('audio-library', 7);

    this.db.openDatabase(7, (ev: IDBVersionChangeEvent) => {

      // let objectStore = evt.currentTarget.result.createObjectStore(
      //   'people', { keyPath: "id", autoIncrement: true });
      //
      // objectStore.createIndex("name", "name", { unique: false });
      // objectStore.createIndex("email", "email", { unique: true });

      console.log([this], "asyncInit", "onupgradeneeded");

      // evt.currentTarget.result

      var albums = this.db.createObjectStore("album", {autoIncrement: true});
      albums.createIndex("by_name", "name");
      albums.createIndex("by_nameLowerCase", "nameLowerCase");

      var artist = this.db.createObjectStore("artist", {autoIncrement: true});
      artist.createIndex("by_name", "name");
      artist.createIndex("by_nameLowerCase", "nameLowerCase");

      var genre = this.db.createObjectStore("genre", {autoIncrement: true});
      genre.createIndex("by_name", "name");
      genre.createIndex("by_nameLowerCase", "nameLowerCase");

      var track = this.db.createObjectStore( AudioLibraryProvider.TRACK, {autoIncrement: true});

    });

    // var request: IDBOpenDBRequest = window.indexedDB.open('audio-library', 6 );
    //
    // request.onupgradeneeded = ( ev: IDBVersionChangeEvent) => {
    //
    //
    // }

  }

  async loadFolder() {



    const files: FileNode[] = await this.vlc.browse( "/Users/lrlong/Music/iTunes/iTunes Music/Akira/Akira" );

    for( let file of files ) {


      const track: IAudioTrack = {

        name: file.value.name,
        path: file.value.path,
        size: file.value.size,

      };

      this.db.add( AudioLibraryProvider.TRACK, track);
    }



  }

}
