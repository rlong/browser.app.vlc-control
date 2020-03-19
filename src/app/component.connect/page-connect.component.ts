import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {ConfigurationService} from '../service.configuration/configuration.service';
import {AudioLibraryService} from '../service.audio-library/audio-library.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RouteDescriptors} from '../RouteDescriptors';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.scss']
})
export class PageConnectComponent implements OnInit {


  // private _host = null;
  private connected = false;

  // set host(value: string) {
  //
  //   this._host = value;
  //   this.config.setHost( value );
  // }


  host = {

    formControl: new FormControl(null, [Validators.required] ),
  };


  formGroup = new FormGroup({
    host: this.host.formControl
  });


  ngOnInit() {


    const host = this.config.getHost( 'localhost:4200');
    if ( host ) {

      this.host.formControl.setValue( host );
      this.vlc.init( host );
      this.tryConnect();
    }
  }

  async tryConnect() {

    try {

      this.connected = false;

      this.vlc.init( this.host.formControl.value );
      const status = await this.vlc.getStatus();
      console.log( [this], 'tryConnect', status );

      this.connected = true;
      this.config.setHost( this.host.formControl.value );
      RouteDescriptors.home.navigate( this.router );

    } catch (e) {

      console.error( [this], 'tryConnect', e  );
    }
  }


  constructor( private vlc: VlcService,
               private config: ConfigurationService,
               private audioLibrary: AudioLibraryService,
               private router: Router ) { }

}
