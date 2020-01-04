import { Injectable } from '@angular/core';
import { Tab, TabLine } from './tabs/tab'
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  tab = [];
  lines: Array<TabLine> = [];
  constructor(){}
  add(message: string) {
    this.messages.push(message);
  }
  addTab(tab: Tab){
    let tabLines: Array<TabLine> = tab.getLines()
    tabLines.forEach(line => {
      this.tab.push({tab_string:line.toString()})
      console.log("I am being added to the message..")
    });
  }
  clear() {
    this.messages = [];
  }

}
