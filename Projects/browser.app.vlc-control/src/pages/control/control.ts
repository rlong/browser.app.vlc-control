import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";






/**
 */
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage implements OnInit, OnDestroy{

  public status: StatusReference;
  public playlist: PlaylistReference;


  constructor(public navCtrl: NavController,
              public vlc: VlcProvider,
              public navParams: NavParams,
              private platform: Platform,
              ) {

    this.status = vlc.status;
    this.playlist = vlc.playlist;
    this.vlc.getStatus(true);

    this.platform.pause.subscribe((result)=>{

      this.vlc.stopPollingStatus();
    });

    this.platform.resume.subscribe((result)=>{

      this.vlc.startPollingStatus();
    });

  }


  ionViewDidLoad() {
  }


  ngOnInit(): void {

    console.debug( [this], 'ngOnInit' );
    this.vlc.getStatus();
    this.vlc.startPollingStatus();
  }


  ngOnDestroy(): void {

    console.debug( [this], 'ngOnDestroy' );
    this.vlc.stopPollingStatus();
  }


  playPause() {

    this.vlc.playPause();
  }

  toggleFullScreen() {

    this.vlc.toggleFullScreen();
  }

  playlistNext() {

    this.vlc.pl_next();
  }

  playlistPrevious() {

    this.vlc.pl_previous();
  }


  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(ControlPage );
  }


}
