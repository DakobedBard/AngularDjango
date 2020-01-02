import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes: Array<Note>;
  private pointer = 0;
  lines : TabLine[] = [];
  nlines = 0;
  currentMeasure = 0;
  constructor() { 
    this.notes = [
        {
          gString:'e',
          fret:2,
          beat:0
        },
        {
          gString:'e',
          fret:3,
          beat:1
        },
        {
          gString:'e',
          fret:4,
          beat:2
        },
        {
          gString:'e',
          fret:5,
          beat:3
        }
    ];
    this.generateLines()
  }
  public nextLine(): IteratorResult<String> {
    if (this.pointer < this.lines.length) {
        console.log("I'm herere")
      return {
        done: false,
        value: this.lines[this.pointer++].generateString()
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }
  nLines(){
      return this.nlines;
  }
  generateLines(){
    let line = new TabLine([this.notes]);
    let line2 = new TabLine([this.notes]);
    let line3 = new TabLine([this.notes]);
    this.nlines = 3;
    this.lines.push(line);
    this.lines.push(line2);
    this.lines.push(line3);

  }
  generateString(){

  }
}

export class TabLine{
  measures: Measure[] = []
  outputString="";
  notes : Array<Note>;
  constructor(notes){
    this.notes = notes;
    this.generateMeasures()
  }
  generateMeasures(){
    let measure = new Measure([])
    this.notes.forEach(note => {
        measure.addtoSring(note);
    });
    this.measures.push(measure)
  }
  generateString(){
      this.measures.forEach(measure => {
          this.outputString += measure.generateString();
          console.log(measure.generateString())
      });
      return this.outputString;
  }
}

export class Measure{
    notes;
    outputString ="";
    constructor(notes: Array<Note>){
        this.notes = notes;
        let beatIndex = 0;
        let beats = []
        notes.forEach(note => {
            this.addtoSring(note)
            beats.push(note.beat)    
        });

    }
    addtoSring(note: Note){
        this.outputString += "$"+note.gString + ' ' + note.fret + ' '
    }
    addMultipleNotes(notes: Array<Note>){

    }
    generateString(){
        return this.outputString + '||'
    }
}

export class Note{
    fret;
    gString;
    beat;
    constructor(fret, gString, beat){
        this.gString = gString;
        this.fret = fret;
        this.beat = beat
    }
}

