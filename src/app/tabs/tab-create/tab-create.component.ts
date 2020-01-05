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

}
