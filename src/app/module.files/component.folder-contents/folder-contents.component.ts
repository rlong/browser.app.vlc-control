import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../service.configuration/configuration.service';
import {VlcContextService} from '../../service.vlc-context/vlc-context.service';
import {FileNode, FileNodeArray} from '../../model/vlc';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteManifest} from '../../RouteManifest';


export interface Section {
  name: string;
  updated: Date;
}



@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.scss']
})
export class FolderContentsComponent implements OnInit {


  folders: FileNode[] = null;
  files: FileNode[] = null;

  async init( dir: string ) {


    const files = await this.vlc.browse( dir );
    const filesAndFolders =  FileNodeArray.splitFilesAndFolders( files );
    this.folders = filesAndFolders[0];
    this.files = filesAndFolders[1];
  }


  async onClick(file: FileNode) {

    console.log( 'file', file );
    if( file.isDirectory ) {

      this.router.navigate( ['files/', file.value.path]);
    } else {

      await this.vlc.in_play( file.value.path );
      RouteManifest.PLAYBACK_CONTROL.navigate( this.router );
    }
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      let dir = this.route.snapshot.paramMap.get('dir');
      console.log( 'dir', dir );
      if( !dir ) {

        dir = '~';
      }
      this.init( dir );

    });

  }

  constructor( private config: ConfigurationService,
               private vlc: VlcContextService,
               private route: ActivatedRoute,
               private router: Router
  ) {
  }

}
