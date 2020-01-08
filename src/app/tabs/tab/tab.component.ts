import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../tab.service'
import { MessageService } from '../../message.service'
import { Tab, NoteClass, Measure } from '../tab'
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

  strs: Array<string>;
  tabs: any = [];
  constructor(private messageService: MessageService, private tabService: TabService) { 
  }
  deleteTab(id:number){
    this.tabService.deleteTab(id).subscribe(
      (data) => {
        console.log("The item was deleted..")
      },
      (err) => {  
        console.log(err);
      }
    
    )
  }

  ngOnInit() {

  }
}


