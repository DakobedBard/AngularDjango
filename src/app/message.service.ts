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
    this.guitarTab = tab;
    this.notes = tab.notes;
    this.generateLines();;
    this.generateStrings();
    this.tabName = tab.name;
    // this.guitarTab.strs
  }
  getTab():Tab{
    return this.guitarTab; 
  }
  clear() {
    this.messages = [];
  }

  generateBeatMap():Map<number, Array<NoteClass>>{
    let arr: NoteClass[];
    let beatMap = new Map<number, Array<NoteClass>>();
    this.notes.sort((a, b) => (a.beat > b.beat) ? 1 : -1)
    this.notes.forEach((note,index) => {
      try {
        arr = beatMap.get(note.beat)
        arr.push(note)
      }
      catch(e) {
        arr = new Array<NoteClass>()
        arr.push(note)
        beatMap.set(note.beat,arr)
      } 
    });
    return beatMap
  }
  iteratebeats(map: Map<number, Array<NoteClass>>):Array<Measure>{
      let measureArray: Measure[] = []
      let measure = new Measure()
      let currentBeat = 0;
      let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))

      map.forEach((noteArray,beat) => {
        if(beat>currentBeat){
          for (let i = 0; i < beat-currentBeat; i++) {
            measure.addRest()
          }
        }
        currentBeat = beat;
        if(noteArray.length==1){
          measure.addNote(noteArray[0]);
        }else{
          measure.addNotes(noteArray);
        }
      });
      measureArray.push(measure);
      return measureArray;
    }
    generateLines(){
      let measures: Measure[] = this.iteratebeats(this.generateBeatMap());
      let line = new TabLine(measures);
      this.lines.push(line)
   }
    generateStrings(){
      this.strs = [];
      this.lines.forEach(line => {
        this.strs.push(line.toString())
      });      
    }


}
