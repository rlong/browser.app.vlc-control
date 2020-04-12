import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {ConfigurationService} from '../service.configuration/configuration.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RouteManifest} from '../RouteManifest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PageHomeComponent implements OnInit {

  initialising = true;
  private connected = false;


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
      this.onTestConnect();
    }
  }

  async onTestConnect() {

    try {

      this.connected = false;

      this.vlc.init( this.host.formControl.value );
      const status = await this.vlc.getStatus();
      console.log( [this], 'onTestConnect', status );

      this.connected = true;
      this.config.setHost( this.host.formControl.value );
      // RouteDescriptors.home.navigate( this.router );

    } catch (e) {

      console.error( [this], 'onTestConnect', e  );
    }
  }

  onAudioLibrary() {

    RouteManifest.AUDIO_LIBRARY.navigate( this.router );
  }

  onPlaybackControl() {

    RouteManifest.PLAYBACK_CONTROL.navigate( this.router );
  }

  onFiles() {

    RouteManifest.FILES.navigate( this.router );
  }


  onPlaylist() {

    RouteManifest.PLAYLIST.navigate( this.router );
  }

  constructor( private config: ConfigurationService,
               private vlc: VlcService,
               private router: Router ) {

    const host = this.config.getHost( 'localhost:4200');
    this.vlc.init( host );
  }

}
