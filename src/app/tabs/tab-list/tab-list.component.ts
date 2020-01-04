import { Component, OnInit } from '@angular/core';
import { TabService, NoteClass } from '../tab.service'
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
    this.messageService.add("second message..")
    this.tabService.add("tab message..")
    // console.log("Tab detail")
    // let notesArray : Array<NoteClass> = []
    // this.tabs[0].notes.forEach(note => {
    //   notesArray.push(new NoteClass(note.fret,note.gString,note.beat))
    // });
    // this.tabService.setNotes(this.tabs[0].notes)

  }

}
