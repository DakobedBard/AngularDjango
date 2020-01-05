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
  constructor(private http: HttpClient, private messageService: MessageService) { 
  }

  getTabs(){
    return this.http.get(this.tabsURL+'');
  }

  add(message: string) {
    this.messageService.add(message);
    this.messages.push(message)
  }
  clear() {
    this.messages = [];
  }
}
