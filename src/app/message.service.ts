import { Injectable } from '@angular/core';
import { Tab, TabLine , Measure, NoteClass} from './tabs/tab'
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  guitarTab:Tab;
  tabName:string;
  lines: Array<TabLine> = [];
  tablines: TabLine[];
  strs: Array<string>;
  notes: Array<NoteClass> = []
  constructor(){}
  add(message: string) {
    this.messages.push(message);
  }
  setTab(tab: Tab){
    console.log("the strs are " + tab.strs)
    this.strs = tab.strs;
    this.guitarTab = tab;
    this.tabName = tab.name;

  }
  getTab():Tab{
    return this.guitarTab; 
  }
  clear() {
    this.messages = [];
  }
}
