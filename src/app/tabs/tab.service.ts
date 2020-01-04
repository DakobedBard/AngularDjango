import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes: Array<NoteClass>;
  lines : TabLine[] = [];
  messages: string[] = ["first Tab Messsage"];
  private tabsURL = 'http://localhost:8000/tabs/';
  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.notes = [
        {
          gString:'A',
          fret:'2',
          beat:1,
        },
        {
          gString:'D',
          fret:'3',
          beat:1,
        },
        {
          gString:'B',
          fret:'4',
          beat:7,
        },
        {
          gString:'A',
          fret:'4',
          beat:4,
        },
        {
          gString:'G',
          fret:'2',
          beat:4,
        },
        {
          gString:'D',
          fret:'2',
          beat:4,
        },
        {
          gString:'A',
          fret:'2',
          beat:6,
        },
        {
          gString:'A',
          fret:'2',
          beat:7,
        },
        {
          gString:'A',
          fret:'2',
          beat:14,
        },
    ];
    this.generateLines();
  }

  setNotes(notes:Array<NoteClass>){
    this.notes = notes;
    this.generateLines()
  }

  getTabs(){
    return this.http.get(this.tabsURL+'');
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
    console.log("Max beats " + maximumBeats)

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
  public getLines(){
    return this.lines;
  }
  add(message: string) {
    this.messageService.add(message);
    this.messages.push(message)
  }
  clear() {
    this.messages = [];
  }

}





export class TabLine{
  measures: Measure[];
  tablineString="";
  notes : Array<NoteClass>;
  constructor(measures: Measure[]){
    this.measures = measures;
    measures 
  }

  toString():string{
    let lineString:string = ""; 
    this.measures.forEach(measure => {
      lineString += measure.generateString()
    });
    return lineString;
  }
}

export class Measure{
    notes: NoteClass[] = [];
    outputString = "";
    constructor(){}

    addNote(note: NoteClass){
        this.notes.push(note);
        this.outputString += `$${note.gString} ${note.fret}`;  
    }
    generateString(){
        return this.outputString + " |";
    }
    addNotes(notes: Array<NoteClass>){
      notes.forEach(note => {
        this.outputString += `$${note.gString}.${note.fret}.`
      });
    }
    addRest(){
      this.outputString += " "
    }
}

export class NoteClass{
  fret: string;
  gString: string;
  beat: number;
  constructor(fret: string, gString: string, beat: number){
    this.fret = fret;
    this.beat = beat;
    this.gString = gString;
  }
}