import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../service.configuration/configuration.service';
import {VlcService} from '../../service.vlc/vlc.service';
import {FileNode, FileNodeArray} from '../../model/vlc';
import {ActivatedRoute, Router} from '@angular/router';


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


  onClick(file: FileNode) {

    console.log( 'file', file );
    if( file.isDirectory ) {

      this.router.navigate( ['files/', file.value.path]);
    } else {

      this.vlc.in_play( file.value.path );
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
               private vlc: VlcService,
               private route: ActivatedRoute,
               private router: Router
  ) {
  }

}
