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
          beat:1,
        },
        {
          gString:'A',
          fret:'3',
          beat:2,
        },
        {
          gString:'B',
          fret:'4',
          beat:3,
        },
        {
          gString:'A',
          fret:'4',
          beat:4,
        },
        {
          gString:'A',
          fret:'2',
          beat:5,
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
  iteratebeats(map: Map<number, Array<NoteClass>>):Array<Measure>{
    let measureArray: Measure[] = []
    let measure = new Measure()
    console.log("I am here in iterate")
    let currentBeat = 0;
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
      noteArray.forEach(note => {
        console.log("I'm at key " + beat + " with a beat of " + note.fret);
      });
    });
    measureArray.push(measure)
    console.log("The measure looks like " + measure.generateString)
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
        this.outputString += `$${note.gString} ${note.fret} `;
        
    }
    generateString(){
        return this.outputString;
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