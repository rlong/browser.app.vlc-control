import {Component, Input, OnInit} from '@angular/core';
import {RouteManifest} from '../../RouteManifest';
import {Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  @Input() showBack = true;
  @Input() showPlaybackControl = true;

  ngOnInit() {
  }

  onGoBack() {

    this.location.back();
  }

  onPlaybackControl() {

    RouteManifest.PLAYBACK_CONTROL.navigate( this.router );
  }


  constructor( private router: Router,
               private location: Location ) { }

}
