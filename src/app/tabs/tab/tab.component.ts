import { Component, OnInit } from '@angular/core';
import { TabLine }from '../tab'
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',

})
export class TabComponent implements OnInit {
  constructor() { 
    this.tablines.push(new TabLine());
    
  }
  tab;
  chords
  measuresPerLine =5;
  linesPerPage = 8;
  totalMeasures;
  notevalue = 4
  beatsPerBar = 4;
  tablines: TabLine[] = []
  ngOnInit() {

    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 ||'},
      {tab_string: '$A  1 3 | $2 5 3 0 ||'},
      {tab_string: this.tablines[0].generateString()},
      
    ];


  };



}
