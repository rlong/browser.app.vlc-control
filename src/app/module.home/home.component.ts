import { Component, OnInit } from '@angular/core';
import {VlcContextService} from '../service.vlc-context/vlc-context.service';
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



  host = {

    formControl: new FormControl(null, [Validators.required] ),
  };


  formGroup = new FormGroup({
    host: this.host.formControl
  });


  ngOnInit() {

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

  constructor( private vlc: VlcContextService,
               private router: Router ) {

  }

}
