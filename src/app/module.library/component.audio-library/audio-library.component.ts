import { Component, OnInit } from '@angular/core';
import {AudioLibraryService} from '../service.audio-library/audio-library.service';
import {LibrarySetupStats} from '../service.audio-library/LibrarySetupStats';
import {FileNode} from '../../model/vlc';
import {ancestorWhere} from 'tslint';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Location} from '@angular/common';
@Component({
  selector: 'app-audio-library',
  templateUrl: './audio-library.component.html',
  styleUrls: ['./audio-library.component.scss']
})
export class AudioLibraryComponent implements OnInit {



  audioFiles: FileNode[] = null;
  stats: LibrarySetupStats = new LibrarySetupStats();


  init() {


    console.log('this.route.snapshot.fragment', this.route.snapshot.fragment );
    console.log('this.route.snapshot', this.route.snapshot );
    console.log('this.route', this.route );
    console.log('this.location.path()', this.location.path() );

  }

  ngOnInit() {


    this.init();

    // vvv [How to detect a route change in Angular? - Stack Overflow](https://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular)
    this.router.events
      .pipe( filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.init();
      });
    // ^^^ [How to detect a route change in Angular? - Stack Overflow](https://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular)

  }

  async onGetAudioFiles() {

    this.audioFiles =  await this.audioLibrary.getAudioFiles( this.stats );
  }

  async onSetupLibrary() {

    await this.audioLibrary.setupLibrary( this.audioFiles, this.stats );
  }

  async onLoadLibrary()  {

    await this.audioLibrary.loadLibrary();
  }

  constructor( private audioLibrary: AudioLibraryService,
               private route: ActivatedRoute,
               private router: Router,
               public location: Location
  ) {
  }

}
