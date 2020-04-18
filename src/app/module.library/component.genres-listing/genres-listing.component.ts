import { Component, OnInit } from '@angular/core';
import {AudioLibraryService, Genre, IndexedDatum} from '../service.audio-library/audio-library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-genres-listing',
  templateUrl: './genres-listing.component.html',
  styleUrls: ['./genres-listing.component.scss']
})
export class GenresListingComponent implements OnInit {


  ngOnInit() {
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
