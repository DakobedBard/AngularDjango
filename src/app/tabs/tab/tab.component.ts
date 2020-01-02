import { Component, OnInit } from '@angular/core';
import { TabLine }from '../tab'
import { TabService } from '../../tab.service'
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
  tablines: TabLine[] = []
  tabService: TabService
  constructor(tabService: TabService) { 
    this.tabService = tabService;
    this.tablines.push(new TabLine())
  }
  ngOnInit() {

    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 ||'},
      {tab_string: '$A  1 3 | $2 5 3 0 ||'},  
    ];
    this.tablines = this.tabService.lines
    console.log("Thare are " + this.tablines.length)

    this.tablines.forEach((line, index) => {
      console.log("tablines " + index +  " index " +  line.generateString())
      this.tab.push({
        tab_string:line.generateString()
      })
    });
    console.log("tab service " + this.tabService.nextLine().value)

  };



}
