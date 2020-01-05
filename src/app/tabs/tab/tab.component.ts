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

  }
}
