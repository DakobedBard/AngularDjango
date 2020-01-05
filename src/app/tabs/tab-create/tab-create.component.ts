import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { MessageService } from 'src/app/message.service';
import { NoteClass, Tab } from '../tab';

@Component({
  selector: 'app-tab-create',
  templateUrl: './tab-create.component.html',
  styleUrls: ['./tab-create.component.css']
})
export class TabCreateComponent implements OnInit {
  constructor(private tabService: TabService, private messageService: MessageService) { }


  ngOnInit() {
  }
  createTab(){
    let tab: Tab = new Tab("Tab Create from UI", [new NoteClass('2','G',1), new NoteClass('3','G',3)], 1);
    this.tabService.postTab(tab).subscribe(
      (data) => {
        console.log("The data is " + data)
      },
      (err) => {  
        console.log(err);
      }
    )
  }

}
