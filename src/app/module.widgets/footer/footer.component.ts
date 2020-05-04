import {Component, Input, OnInit} from '@angular/core';
import {RouteManifest} from '../../RouteManifest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  @Input() showPlaybackControl = true;

  ngOnInit() {
  }

  onPlaybackControl() {

    RouteManifest.PLAYBACK_CONTROL.navigate( this.router );
  }


  constructor( private router: Router ) { }

}
