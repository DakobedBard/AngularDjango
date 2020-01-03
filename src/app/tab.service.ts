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
          getString: () => '$ A 2 '
        }
     ,
    ];
    this.generateLines()
  }
  nLines(){
      return this.lines.length;
  }
  generateLines(){
    let noteArray : NoteClass[] = []
    let line = new TabLine([this.notes[0]]);
    console.log("Length " + this.notes[0].getString())
    // this.lines.push(line)
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
    console.log("LengthInMeasure " + this.notes[0].getString())
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
    outputString = " ";
    constructor(notes: Array<NoteClass>){
      console.log("notes " + notes.length)


        // notes.forEach(note => {

        //     this.addtoMeasure(note)

        // });

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