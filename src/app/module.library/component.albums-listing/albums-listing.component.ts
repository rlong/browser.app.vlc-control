import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Album, AudioLibraryService, Genre, IndexedDatum} from '../service.audio-library/audio-library.service';

@Component({
  selector: 'app-albums-listing',
  templateUrl: './albums-listing.component.html',
  styleUrls: ['./albums-listing.component.scss']
})
export class AlbumsListingComponent implements OnInit {


  albums: IndexedDatum<Album>[] = null;
  title: string = null;
  headerSvgIcon: string = null;

  onAlbumClick( album: IndexedDatum<Album> ) {

    this.router.navigate( ['audio-library/albums', album.index, 'tracks' ]);
  }

  async init( genreIndex: number|null, artistIndex: number|null ) {


    if( this.audioLibrary.initialising ) {

      await this.audioLibrary.initialising.toPromise();
    }

    if( genreIndex ) {

      const genre = this.audioLibrary.audioLibrary.genres.value[genreIndex];
      this.title = genre.value;
      this.albums = this.audioLibrary.audioLibrary.findAlbumsByGenre( genre );
      this.headerSvgIcon = 'music-box-multiple';

      return;
    }

    if( artistIndex ) {

      const artist = this.audioLibrary.audioLibrary.artists.value[artistIndex];
      this.title = artist.value;
      this.albums = this.audioLibrary.audioLibrary.findAlbumsByArtist( artist );
      this.headerSvgIcon = 'account-multiple';

      return;
    }


    this.title = 'Albums';
    this.albums = this.audioLibrary.audioLibrary.albums.value.slice(0);
    this.headerSvgIcon = 'album';
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      let genreIndex: number|null = null;
      const genreIndexParam = this.route.snapshot.paramMap.get('genreIndex');
      if( genreIndexParam ) {
        genreIndex = Number.parseInt(genreIndexParam, 10);
      }

      let artistIndex: number|null = null;
      const artistIndexParam = this.route.snapshot.paramMap.get('artistIndex');
      if( artistIndexParam ) {
        artistIndex = Number.parseInt(artistIndexParam, 10);
      }

      this.init( genreIndex, artistIndex );
    });

  }

  constructor( private audioLibrary: AudioLibraryService,
               private route: ActivatedRoute,
               private router: Router ) { }

}
