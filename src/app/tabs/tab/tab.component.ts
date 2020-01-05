import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service'
import { Subscription } from 'rxjs';
import { MessageService } from '../../message.service'
import { Tab, TabLine } from '../tab'
declare const jtab: any;
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  providers:[TabService]
})
export class TabComponent implements OnInit {
  tab;
  messages: any[] = [];
  measuresPerLine =5;
  linesPerPage = 8;
  totalMeasures;
  notevalue = 4
  beatsPerBar = 4;
  tablines: TabLine[];
  tabs: any = [];
  constructor(private tabService: TabService, private messageService: MessageService) { 
  }

  getTabs(){
    this.tabService.getTabs().subscribe(
      (data) => {
      console.log("The data is ! " + data)
      for (const tab of (data as any)) {
        this.tabs.push({
          notes: tab.notes,
          name:tab.name
        });
      }
      console.log("why")
      this.tabs.forEach(tab => {
        console.log("first tab is " + tab.name)
      });
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 $4.7/9.$3.6/                               ||'},
    ];
    let tablines = this.tabService.getTab().getLines()
    tablines.forEach((line, index) => {

      this.tab.push({
        tab_string:line.toString()
      })
    });
    jtab.render($('#mytab'),'Am7 C');

    this.getTabs()

  };

}
