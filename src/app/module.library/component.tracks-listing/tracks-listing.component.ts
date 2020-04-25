import { Component, OnInit } from '@angular/core';
import {AudioTrack, AudioLibraryService, IndexedDatum, Album, Genre} from '../service.audio-library/audio-library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VlcService} from '../../service.vlc/vlc.service';
import {Playlist} from '../../model/vlc';

@Component({
  selector: 'app-tracks-listing',
  templateUrl: './tracks-listing.component.html',
  styleUrls: ['./tracks-listing.component.scss']
})
export class TracksListingComponent implements OnInit {

  audioTracks: AudioTrack[] = null;
  playlist: Playlist = null;
  title = '';


  async init( albumIndex: number|null, genreIndex: number|null ) {

    if( this.audioLibrary.initialising ) {

      await this.audioLibrary.initialising.toPromise();
    }

    const audioTracks = this.audioLibrary.audioLibrary.audioTracks.slice(0);
    if( null !== albumIndex ) {

      const album: IndexedDatum<Album> = this.audioLibrary.audioLibrary.albums.value[ albumIndex ];
      this.title = album.value;
      for (const i in audioTracks ) {

        if( album !== audioTracks[i].album ) {
          audioTracks[i] = null;
        }
      }
    } else {

      if( null !== genreIndex ) {

        const genre: IndexedDatum<Genre> = this.audioLibrary.audioLibrary.genres.value[ genreIndex ];
        for (const i in audioTracks ) {

          if( audioTracks[i] && genre !== audioTracks[i].genre ) {
            audioTracks[i] = null;
          }
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


  async onAudioTrackClick( audioTrack: AudioTrack ) {


    if( !this.playlist ) {

      await this.vlc.pl_empty();

      const orderedTracks = AudioTrack.sortByTrackNumber( this.audioTracks );
      for( const orderedTrack of orderedTracks ) {

        this.vlc.in_enqueue( orderedTrack.path );
      }

      this.playlist = await this.vlc.getPlaylist( true );
      console.log( this.playlist );

    }

    for( const candidate of this.playlist.root.children ) {

      if( audioTrack.filename === candidate.value.name ) {

        this.vlc.pl_play( candidate );
        return;
      }
    }


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
               private router: Router,
               private vlc: VlcService) { }

}
