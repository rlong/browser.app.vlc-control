import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../service.configuration/configuration.service';
import {VlcService} from '../../service.vlc/vlc.service';
import {FileNode} from '../../model/vlc';


export interface Section {
  name: string;
  updated: Date;
}



@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {


  files: FileNode[] = null;

  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];


  async asyncOnInit() {

    this.files = await this.vlc.browse( '~' );
  }

  ngOnInit() {


    this.asyncOnInit();
  }

  constructor( private config: ConfigurationService,
               private vlc: VlcService ) {
  }

}
