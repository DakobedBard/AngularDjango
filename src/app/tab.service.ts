import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes;
  private pointer = 0;
  lines : TabLine[] = [];
  nlines = 0;
  currentMeasure = 0;
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
          beat:1,
          rest:false,
          getString: () => '$A 3 '
        },
    ];
    this.generateLines()
  }
  nLines(){
      return this.lines.length;
  }
  generateLines(){
    let noteArray : NoteClass[] = []
    let line = new TabLine(this.notes);
    this.lines.push(line)
  }
  generateString(){

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
      console.log("LengthInMeasure " + note.getString());
      measure.addtoMeasure(note);
    });
    this.measures.push(measure)
  }
  toString():string{
    let lineString:string = "";
    this.measures.forEach(measure => {
      lineString += measure.generateString()
    });
    console.log("The line string is " + lineString)
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