import { Component, OnInit } from '@angular/core';
import {AudioLibraryService, Genre, IndexedDatum} from '../service.audio-library/audio-library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Command} from '../../../util/Command';

@Component({
  selector: 'app-genres-listing',
  templateUrl: './genres-listing.component.html',
  styleUrls: ['./genres-listing.component.scss']
})
export class GenresListingComponent implements OnInit {

  loading: Command<void> = null;

  async init() {

    this.loading = this.audioLibrary.loading;
    if( this.loading ) {

      await this.loading.toPromise();
    }
    this.loading = null;

  }


  ngOnInit() {

    this.init();
  }


  onGenreClick( genre: IndexedDatum<Genre> ) {

    this.router.navigate( ['audio-library/genres', genre.index]);
  }


  constructor( private audioLibrary: AudioLibraryService,
               private route: ActivatedRoute,
               private router: Router,
  ) {
  }

}
