import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { NoteClass, TabLine, Measure , Tab} from './tab' 
@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes: Array<NoteClass>;
  lines : TabLine[] = [];
  messages: string[] = ["first Tab Messsage"];
  private tabsURL = 'http://localhost:8000/tabs/';
  tab: Tab;
  constructor(private http: HttpClient, private messageService: MessageService) { 
    let notes = [
        { gString:'A', fret:'2', beat:1,},
        { gString:'D', fret:'3', beat:1,},
        { gString:'B', fret:'4', beat:7,},
        { gString:'A', fret:'4',beat:4,},
        { gString:'G', fret:'2', beat:4,},
        { gString:'D', fret:'2', beat:4, },
        {  gString:'A', fret:'2', beat:6,},
        { gString:'A', fret:'2',  beat:7,},
        { gString:'A',fret:'2', beat:14, },
    ];
    let noteArray:Array<NoteClass> = []
    notes.forEach(note => {
      noteArray.push(note)
    });
    this.tab = new Tab("First Tab", noteArray )
  }

  getTabs(){
    return this.http.get(this.tabsURL+'');
  }
  getTab():Tab{
    return this.tab
  }  
  add(message: string) {
    this.messageService.add(message);
    this.messages.push(message)
  }
  clear() {
    this.messages = [];
  }
}
