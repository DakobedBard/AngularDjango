import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../tab.service'
import { NoteClass, Tab } from '../tab'
import { MessageService } from '../../message.service'
@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.css']
})
export class TabListComponent implements OnInit {
  @Input() guitarTabs: Array<Tab>;
  tabNames: Array<string>;
  tabs: any[] = [];
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
    console.log("The number of tabs is " + this.guitarTabs.length)
    this.tabNames = []
    this.guitarTabs.forEach(tab => {
      this.tabNames.push(tab.name);
    });
    this.getTabs()
  }
  tabDetail(index:number){
    console.log("THE INDEX IS " + index);
    this.messageService.add("second message..")
    this.tabService.add("tab message..")
    this.messageService.setTab(this.guitarTabs[index])
    
  }

}
