import {ActivatedRouteSnapshot} from '@angular/router';
import {Location} from '@angular/common';


export class AudioLibraryNavigation {


  albumIndex: number = null;
  artistIndex: number = null;
  genreIndex: number = null;

  browsingAlbums = false;
  browsingArtists = false;
  browsingGenres = false;

  constructor( activatedRoute: ActivatedRouteSnapshot, location: Location ) {

    this.albumIndex = Number.parseInt(activatedRoute.paramMap.get('albumIndex'), 10) ;
    this.artistIndex = Number.parseInt(activatedRoute.paramMap.get('artistIndex'), 10) ;
    this.genreIndex = Number.parseInt(activatedRoute.paramMap.get('genreIndex'), 10) ;

    const path = location.path();
    if( path.endsWith( 'albums')) {

      this.browsingGenres = true;
    } else if( path.endsWith( 'artists')) {

      this.browsingGenres = true;
    } else if( path.endsWith( 'genres')) {

      this.browsingGenres = true;
    }

  }

}
