import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



class AudioTrack {


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
export class MusicLibraryProvider {


  db;
  constructor() {

    this.asyncInit();
  }

  async asyncInit() {


    var request: IDBOpenDBRequest = window.indexedDB.open('music-library', 6 );

    request.onupgradeneeded = ( ev: IDBVersionChangeEvent) => {

      console.log([this], "asyncInit", "onupgradeneeded");

      const db = request.result;

      var albums = db.createObjectStore("album", {autoIncrement: true});
      albums.createIndex("by_name", "name");
      albums.createIndex("by_nameLowerCase", "nameLowerCase");

      var artist = db.createObjectStore("artist", {autoIncrement: true});
      artist.createIndex("by_name", "name");
      artist.createIndex("by_nameLowerCase", "nameLowerCase");

      var genre = db.createObjectStore("genre", {autoIncrement: true});
      genre.createIndex("by_name", "name");
      genre.createIndex("by_nameLowerCase", "nameLowerCase");

      var track = db.createObjectStore("track", {autoIncrement: true});

      albums.add( {name:"Akira"});

    }

  }

}
