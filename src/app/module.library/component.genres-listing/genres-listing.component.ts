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



  ngOnInit() {
  }


  onGenreClick( genre: IndexedDatum<Genre> ) {

    // genres/:genreIndex/albums
    this.router.navigate( ['audio-library/genres', genre.index, 'albums']);
  }


  constructor( private audioLibrary: AudioLibraryService,
               private router: Router,
  ) {
  }

}
