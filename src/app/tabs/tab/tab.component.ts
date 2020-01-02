import { Component, OnInit } from '@angular/core';
import { TabLine }from '../tab'
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',

})
export class TabComponent implements OnInit {
  constructor() { 

  }
  tab;
  chords
  measuresPerLine =5;
  linesPerPage = 8;
  totalMeasures;
  notevalue = 4
  beatsPerBar = 4;
  lines: Array<TabLine>;
  ngOnInit() {
    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 ||'},
      {tab_string: '$A 0 1 3 | $2 5 3 0 ||'}
    ];
    this.chords = [
      {tab_string: 'G / / / | Bm / C / ||'},
      {tab_string: 'D / / / | Am / B / ||'},
    ]
  };



}
