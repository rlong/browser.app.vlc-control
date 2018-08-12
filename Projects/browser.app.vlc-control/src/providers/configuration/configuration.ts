import { Injectable } from '@angular/core';

/*
*/
@Injectable()
export class ConfigurationProvider {

  constructor() {
    console.log('Hello ConfigurationProvider Provider');
  }

  getHost( defaultValue: string ): string {

    const answer = localStorage.getItem( "ConfigurationProvider.host" );

    if( answer ) {
      return answer;
    }

    return defaultValue;
  }

  setHost( value: string ) {

    localStorage.setItem( "ConfigurationProvider.host", value );
  }


}
