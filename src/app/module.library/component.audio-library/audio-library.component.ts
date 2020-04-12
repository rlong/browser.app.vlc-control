import { Component, OnInit } from '@angular/core';
import {AudioLibraryService} from '../service.audio-library/audio-library.service';
import {LibrarySetupStats} from '../service.audio-library/LibrarySetupStats';
import {FileNode} from '../../model/vlc';
import {ancestorWhere} from 'tslint';

@Component({
  selector: 'app-audio-library',
  templateUrl: './audio-library.component.html',
  styleUrls: ['./audio-library.component.scss']
})
export class AudioLibraryComponent implements OnInit {


  audioFiles: FileNode[] = null;
  stats: LibrarySetupStats = new LibrarySetupStats();

  ngOnInit() {
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
  // ~/Music/iTunes/iTunes\ Music/Akira
  constructor( private audioLibrary: AudioLibraryService ) {
  }

}
