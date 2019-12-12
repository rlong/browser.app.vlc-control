import { Component, OnInit } from '@angular/core';
import {MockPlayback} from './MockPlayback';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  private mockPlayback = new MockPlayback();


  ngOnInit() {

  }

  constructor() { }

}
