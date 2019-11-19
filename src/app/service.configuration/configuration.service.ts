import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {



  getHost( defaultValue: string ): string {

    const answer = localStorage.getItem( 'ConfigurationProvider.host' );

    if ( answer ) {
      return answer;
    }

    return defaultValue;
  }

  setHost( value: string ) {

    localStorage.setItem( 'ConfigurationProvider.host', value );
  }

  constructor() {
    console.log('Hello ConfigurationProvider Provider');
  }


}
