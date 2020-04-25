import { Component, OnInit } from '@angular/core';
import {Artist, AudioLibraryService, Genre, IndexedDatum} from '../service.audio-library/audio-library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artists-listing',
  templateUrl: './artists-listing.component.html',
  styleUrls: ['./artists-listing.component.scss']
})
export class ArtistsListingComponent implements OnInit {


  ngOnInit() {
  }

  onArtistClick( artist: IndexedDatum<Artist> ) {

    // artists/:artistIndex/albums
    this.router.navigate( ['audio-library/artists', artist.index, 'albums']);
  }

  constructor( private audioLibrary: AudioLibraryService,
               private router: Router,
  ) {
  }


}
