import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../tab.service'
import { MessageService } from '../../message.service'
import { Tab, TabLine } from '../tab'
declare const jtab: any;
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  providers:[TabService]
})
export class TabComponent implements OnInit {
  @Input() guitarTab: Tab;
  tab;
  messages: any[] = [];
  tablines: TabLine[];
  tabs: any = [];
  constructor(private tabService: TabService, private messageService: MessageService) { 
  }

  getTabs(){
    this.tabService.getTabs().subscribe(
      (data) => {
        for (const tab of (data as any)) {
          this.tabs.push({
            notes: tab.notes,
            name:tab.name
          });
        }
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  ngOnInit() {
    console.log('guitarTab name is:',this.guitarTab.getName());
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
