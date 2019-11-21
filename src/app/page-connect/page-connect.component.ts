import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {ConfigurationService} from '../service.configuration/configuration.service';
import {AudioLibraryService} from '../service.audio-library/audio-library.service';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.scss']
})
export class PageConnectComponent implements OnInit {


  private _host = null;
  private connected = false;

  set host(value: string) {

    this._host = value;
    this.config.setHost( value );
  }

  get host() {

    return this._host;
  }


  ngOnInit() {

    this._host = this.config.getHost( null);
    if ( this._host ) {

      this.vlc.init( this._host );
      this.tryConnect();
    }
  }

  async tryConnect() {

    try {

      this.connected = false;

      this.vlc.init( this._host );
      const status = await this.vlc.getStatus();
      console.log( [this], 'tryConnect', status );

      this.connected = true;

    } catch (e) {

      console.error( [this], 'tryConnect', e  );
    }

  }


  constructor( private vlc: VlcService,
               private config: ConfigurationService,
               private audioLibrary: AudioLibraryService) { }

}
