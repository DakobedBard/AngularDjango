import { Injectable } from '@angular/core';
import { NoteClass } from './tabs/tab'
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  tabs: Array<Tab> = []
  constructor(){}
  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
  sendTab(name:string, notes:Array<NoteClass>){
    this.messages.push(name)
    let tab:Tab = new Tab(name, notes)
    this.tabs.push(tab)
  }
}
export class Tab{
  constructor(public name:string, public notes: Array<NoteClass>){}
}