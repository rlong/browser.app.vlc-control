import { Component, OnInit } from '@angular/core';
import {AudioTrack, AudioLibraryService, IndexedDatum, Album, Genre} from '../service.audio-library/audio-library.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tracks-listing',
  templateUrl: './tracks-listing.component.html',
  styleUrls: ['./tracks-listing.component.scss']
})
export class TracksListingComponent implements OnInit {

  audioTracks: AudioTrack[] = null;


  async init( albumIndex: number|null, genreIndex: number|null ) {

    if( this.audioLibrary.loading ) {

      await this.audioLibrary.loading.toPromise();
    }

    const audioTracks = this.audioLibrary.audioLibrary.audioTracks.slice(0);
    if( null !== albumIndex ) {

      const album: IndexedDatum<Album> = this.audioLibrary.audioLibrary.albums.value[ albumIndex ];
      for (const i in audioTracks ) {

        if( album !== audioTracks[i].album ) {
          audioTracks[i] = null;
        }
      }
    }

    if( null !== genreIndex ) {

      const genre: IndexedDatum<Genre> = this.audioLibrary.audioLibrary.genres.value[ genreIndex ];
      for (const i in audioTracks ) {

        if( audioTracks[i] && genre !== audioTracks[i].genre ) {
          audioTracks[i] = null;
        }
      }
    }

    const filteredAudioTracks = [];
    // this.audioTracks = [];
    for( const candidate of audioTracks ) {

      if( candidate ) {

        filteredAudioTracks.push( candidate );
      }
    }
    this.audioTracks = filteredAudioTracks;
    console.log( 'this.audioTracks', this.audioTracks );
  }


  onAudioTrackClick( audioTrack: AudioTrack ) {

    console.log( 'audioTrack', audioTrack );

  }

  private getIndex( paramName ): number|null {

    const indexParam = this.route.snapshot.paramMap.get( paramName );
    console.log( 'indexParam', indexParam );

    if( 'string' === typeof indexParam ) {

      return Number.parseInt(indexParam, 10);
    }

    return null;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const albumIndex = this.getIndex( 'albumIndex' );
      const genreIndex = this.getIndex( 'genreIndex' );

      this.init( albumIndex, genreIndex );
    });

  }

  constructor( private audioLibrary: AudioLibraryService,
               private route: ActivatedRoute,
               private router: Router ) { }

}
