import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  notes: Array<NoteClass>;
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
          getString: () => '$ A 2 '
        }
     ,
    ];
    // console.log("note " + this.notes.pop().getString())
    this.generateLines()
  }
  nLines(){
      return this.lines.length;
  }
  generateLines(){
    let line = new TabLine([this.notes]);
    console.log(this.notes.pop().getString())
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
  outputString="";
  notes : Array<NoteClass>;
  constructor(notes){
    this.notes = notes;
    this.notes.forEach(note => {
 
    });
    this.generateMeasures()
  }
  generateMeasures(){
    let measure = new Measure(this.notes)
    // this.notes.forEach(note => {
    //     measure.addtoMeasure(note);
    //     if(note.fret=='|'){
    //       console.log("I see the end of a measure..")
    //       this.measures.push(measure)
    //       measure = new Measure([])
    //     }else if(note.fret=='||'){
    //       this.measures.push(measure)
    //       measure = new Measure([])
    //     }
    // });
    this.measures.push(measure)
  }

  generateString(){
      this.measures.forEach(measure => {
          this.outputString += measure.generateString();

      });
      return this.outputString;
  }
}

export class Measure{
    notes;
    outputString;
    constructor(notes: Array<NoteClass>){
        this.notes = notes;
        this.outputString = ''
        let beatIndex = 0;
        let beats = []
        notes.forEach(note => {

            this.addtoMeasure(note)
            beats.push(note.beat)    
        });

    }
    addtoMeasure(note: NoteClass){
        this.notes.push(note);
        // console.log(note.fret)



    }
    addMultipleNotes(notes: Array<Note>){

    }
    generateString(){
        return this.outputString + '||'
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