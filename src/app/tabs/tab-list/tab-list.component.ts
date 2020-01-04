import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service'
import { NoteClass } from '../tab'
import { MessageService } from '../../message.service'
@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.css']
})
export class TabListComponent implements OnInit {
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
    this.getTabs()
  }
  tabDetail(){
    let tab = this.tabs[0]
    let noteArray:Array<NoteClass> = []
    tab.notes.forEach(note => {
      noteArray.push(note)
    });
    this.messageService.sendTab(tab.name, noteArray)
    this.messageService.add("second message..")
    this.tabService.add("tab message..")
  }

}
