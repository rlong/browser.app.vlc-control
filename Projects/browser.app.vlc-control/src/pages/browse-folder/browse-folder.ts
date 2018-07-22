import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BrowseRootPage} from "../browse-root/browse-root";
import {VlcProvider} from "../../providers/vlc/vlc";
import {FileNode} from "../../model/vlc";
import {ControlPage} from "../control/control";

/**
 * Generated class for the BrowseFolderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-browse-folder',
  templateUrl: 'browse-folder.html',
})
export class BrowseFolderPage implements OnInit {


  pageTitle = "Home";

  fileNodes: FileNode[] = null;
  parent: FileNode = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vlc: VlcProvider,
  ) {

    const parent = navParams.get( "parent" );
    if( parent ) {

      this.parent = parent;
    }
    this.asyncConstructor();
  }

  async asyncConstructor() {

    if( null === this.parent ) {

      this.fileNodes = await this.vlc.browse( "~");
    } else {

      this.pageTitle = this.parent.value.name;
      this.fileNodes = await this.vlc.browse( this.parent.value.path );
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BrowseFolderPage');
  }

  ngOnInit(): void {}


  nodeSelected(fileNode: FileNode) {

    console.log([this], 'nodeSelected', fileNode );

    if( fileNode.isDirectory ) {

      BrowseFolderPage.pushOnTo( this.navCtrl, fileNode );
    }
    if( fileNode.isFile ) {

      this.vlc.in_play( fileNode.value.path );
      ControlPage.pushOnTo( this.navCtrl );
    }

  }


  public static pushOnTo( navCtrl: NavController, parent: FileNode = null ) {

    const params = {
      parent: parent
    };

    navCtrl.push(BrowseFolderPage, params);
  }


}
