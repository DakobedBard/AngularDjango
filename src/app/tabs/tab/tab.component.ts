import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../tab.service'
import { MessageService } from '../../message.service'
import { Tab, TabLine, NoteClass, Measure } from '../tab'
declare const jtab: any;
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
})
export class TabComponent implements OnInit {
  @Input() guitarTab: Tab;
  tab;
  messages: any[] = [];
  notes: Array<NoteClass>;
  lines : TabLine[] = [];
  tablines: TabLine[];
  strs: Array<string>;
  tabs: any = [];
  constructor(private messageService: MessageService) { 
  }


  ngOnInit() {
    this.tab  = [
      {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 $4.7/9.$3.6/                               ||'},
    ];
    
    let tab: Tab = this.messageService.getTab()
    if(tab){


    }else{
      console.log("No")
    }

    // tablines.forEach((line, index) => {
    //   this.tab.push({
    //     tab_string:line.toString()
    //   })
    // });


  };

}
