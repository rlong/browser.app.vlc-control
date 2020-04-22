import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Album, AudioLibraryService, Genre, IndexedDatum} from '../service.audio-library/audio-library.service';

@Component({
  selector: 'app-genres-albums-listing',
  templateUrl: './genres-albums-listing.component.html',
  styleUrls: ['./genres-albums-listing.component.scss']
})
export class GenresAlbumsListingComponent implements OnInit {

  genreIndex: number;
  genre: IndexedDatum<Genre> = null;

  albums: IndexedDatum<Album>[] = null;

  onAlbumClick( album: IndexedDatum<Album> ) {

    this.router.navigate( ['audio-library/genres', this.genreIndex, 'albums', album.index]);
  }

  async init( genreIndex: number ) {

    this.genreIndex = genreIndex;
    if( this.audioLibrary.loading ) {

      await this.audioLibrary.loading.toPromise();
    }

    this.genre = this.audioLibrary.audioLibrary.genres.value[genreIndex];
    this.albums = this.audioLibrary.audioLibrary.findAlbumsByGenre( this.genre );
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const genreIndex = this.route.snapshot.paramMap.get('genreIndex');
      this.init(Number.parseInt(genreIndex, 10));
    });

  }

  constructor( private audioLibrary: AudioLibraryService,
               private route: ActivatedRoute,
               private router: Router ) { }

}
