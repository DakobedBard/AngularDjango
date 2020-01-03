import { Component, OnInit } from '@angular/core';
import { TabLine }from '../tab.service'
import { TabService } from '../tab.service'
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  providers:[TabService]
})
export class TabComponent implements OnInit {
  tab;
  chords
  measuresPerLine =5;
  linesPerPage = 8;
  totalMeasures;
  notevalue = 4
  beatsPerBar = 4;
  tablines: TabLine[];
  tabService: TabService
  constructor(tabService: TabService) { 
    this.tabService = new TabService();
  }
  ngOnInit() {

    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 $4.7/9.$3.6/                               ||'},
    ];
    let tablines = this.tabService.getLines()
    tablines.forEach((line, index) => {
      console.log("The line looks like " + line.toString())
      this.tab.push({
        tab_string:line.toString()
      })
    });

  };



}
