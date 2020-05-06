import { Injectable } from '@angular/core';
import { Tab , NoteClass} from './tabs/tab'
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  guitarTab:Tab;
  tabName:string;
  strs: Array<string> = [];
  notes: Array<NoteClass> = []
  tabID: number;

  editTabMode: boolean = true;

  constructor(){}
  add(message: string) {
    this.messages.push(message);
  }
  setTab(tab: Tab){

    this.strs = tab.strs;
    this.guitarTab = tab;
    this.tabName = tab.name;
    this.tabID = tab.id;
  }
  getTab():Tab{
    return this.guitarTab; 
  }
  clear() {
    this.messages = [];
  }
  setEditMode(edit:boolean){
    this.editTabMode = edit;
  }
  getEditMode():boolean{
    return this.editTabMode;
  }
}
