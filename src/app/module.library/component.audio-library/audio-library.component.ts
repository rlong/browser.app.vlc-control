import { Component, OnInit } from '@angular/core';
import {AudioLibraryService} from '../service.audio-library/audio-library.service';

@Component({
  selector: 'app-audio-library',
  templateUrl: './audio-library.component.html',
  styleUrls: ['./audio-library.component.scss']
})
export class AudioLibraryComponent implements OnInit {


  ngOnInit() {
  }

  // ~/Music/iTunes/iTunes\ Music/Akira
  constructor( audioLibrary: AudioLibraryService ) {
  }

}
