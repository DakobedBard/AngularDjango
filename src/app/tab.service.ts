import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes: Array<NoteClass>;
  lines : TabLine[] = [];
  
  constructor() { 
    this.notes = [
        {
          gString:'A',
          fret:'2',
          beat:0,
          rest:false,
          getString: () => '$A 2 '
        },
        {
          gString:'A',
          fret:'3',
          beat:3,
          rest:false,
          getString: () => '$G 3 '
        },
        {
          gString:'B',
          fret:'4',
          beat:0,
          rest:false,
          getString: () => '$B 4 '
        },
        {
          gString:'A',
          fret:'4',
          beat:1,
          rest:false,
          getString: () => '$D 4 '
        },
    ];
    this.generateLines();
  }
  generateBeatMap():Map<number, Array<NoteClass>>{
    let arr: NoteClass[];
    let beatMap = new Map<number, Array<NoteClass>>();
    this.notes.sort((a, b) => (a.beat > b.beat) ? 1 : -1)
    console.log("Generating beat map therer are " + this.notes.length)
    this.notes.forEach((note,index) => {
      console.log("index:" + index)
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

  iteratebeats(map: Map<number, Array<NoteClass>> ){
    console.log("I am here in iterate")
    let currentBeat = 0;
    map.forEach((noteArray,beat) => {
      noteArray.forEach(element => {
        console.log("I'm at key " + beat + " with a beat of " + element.fret)
      });
    });

  }

  generateLines(){
    let noteArray : NoteClass[] = []
    let line = new TabLine(this.notes);
    this.lines.push(line)
    this.iteratebeats(this.generateBeatMap());
  }
  public getLines(){
    return this.lines;
  }
}

export class TabLine{
  measures: Measure[] = []
  tablineString="";
  notes : Array<NoteClass>;
  constructor(notes){
    this.notes = notes;
    this.generateMeasures()
  }
  generateMeasures(){
    let measure = new Measure()
    this.notes.forEach(note => {
      measure.addtoMeasure(note);
    });
    this.measures.push(measure)
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
    addtoMeasure(note: NoteClass){
        this.notes.push(note);
        this.outputString += note.getString();
    }
    generateString(){
        return this.outputString;
    }
}

export interface Note{
    rest: boolean;
    fret: string;
    gString: string;
    beat: number;
    getString():string;
}
export interface Beat{
  eString;
  bString;
  gString;
  dString;
  aString;
  EString;
}


export class NoteClass{
  fret: string;
  gString: string;
  beat: number;
  rest: boolean
  constructor(fret: string, gString: string, beat: number, rest: boolean){
    this.fret = fret;
    this.rest = rest;
    this.beat = beat;
    this.gString = gString;

  }
  getString():string{
    return "$"+this.gString + " " + this.fret + " ";
  }
}