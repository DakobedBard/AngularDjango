import { TabLineComponent } from './tab-line/tab-line.component';
import { Output } from '@angular/core';

export class Tab{

    beatsPerQuarterNote = 2;
    tablines:Array<Tabline>;
    beatsPerMeasure = 8;
    measuresPerLine = 4;
    beatmap: Map<number, Array<NoteClass>>;
    nLines: number;
    beatsperline:number = 64;
    nMeasures: number;
    strs : Array<string>;
    constructor(public name:string,public notes: Array<NoteClass>, public id:number){
        this.strs = []

    }

    generate(){
      let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))
      let beatmap: Map<number, Array<NoteClass>> = this.generateBeatMap()
      let measure:Measure = new Measure();
      let measures:Array<Measure> = []
      let tablines: Array<Tabline> = [];
      
      let nLines:number = Math.ceil( maximumBeats/32) 
      // console.log("maxbeats " + maximumBeats)

      for(let i=0;i<nLines;i++){

        for(let currentBeat = i*32; currentBeat < 32*(1+i); currentBeat ++){
          // console.log("The current beat is " + currentBeat)
          try{
            measure.addNotes(beatmap.get(currentBeat), currentBeat)
            // console.log("I'm at beat " + currentBeat + " with a note  " + beatmap.get(currentBeat)[0].fret + " and a gstring of " + beatmap.get(currentBeat)[0].gString )
          }
          catch{
            measure.addRest(currentBeat);
          }
          measure = this.pushMeasureIfFull(measures,measure,currentBeat);
        }
        // console.log("Line " + i + " looks like " + this.generateMeasureString(measures))
        console.log()
        tablines.push(new Tabline(measures));
        measures = []
      }
      this.tablines = tablines
      // this.strs.push(this.measuresToString(measures)); 
    }
    generateMeasureString(measures: Array<Measure> ){
      let output:string = ""
      measures.forEach( measure=> {
        output += measure.generateString();
      });
      return output;
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
      beatMap.forEach((value:Array<NoteClass>,key:Number) => {
        // console.log("I'm at beat " + key)
      });
      return beatMap
    }

    pushMeasureIfFull(measures: Array<Measure>, measure: Measure, beat:number): Measure{
      if(measure.isFull()){
        measures.push(measure)
        return new Measure(); 
      }
      return measure;
    }

    generateStrings(){
      this.strs = []
      this.tablines.forEach(tabline => {
        // console.log("THe tabe line looks like " + tabline)
        this.strs.push(tabline.toString())
      });
    }

    addNote(fret: string, gString: string, beat: number){
      this.notes.push(new NoteClass(fret,gString,beat))
    }

    getName():string{
      return this.name
    }
    getNotes():Array<NoteClass>{
      return this.notes;
    }

    setNotes(notes:Array<NoteClass>){
        this.notes = notes;
    }


}

export class Tabline{
  measures: Array<Measure> = [];
  measureCount: number = 0;
  constructor(measures: Array<Measure>){
    this.measures=measures;
    this.measureCount = measures.length;
  }
  addMeasure(measure: Measure){
    this.measures.push(measure)
    this.measureCount++;
  }

  toString():string{
    let output: string = "";
    this.measures.forEach((measure,index) => {
        if(measure.notes.length==0){
          output += "            |";
          output = this.endofMeasure(this.measures.length,index,output, true)
        }else{
          output += measure.generateString();
          output = this.endofMeasure(this.measures.length,index,output, false)      
        }
    });
    return output
  }
  endofMeasure(measuresLength:number , index:number, output:string, isEmpty: boolean){
    if(index==measuresLength-1){
      if(isEmpty){                // This is an edge case since I render empty measures differently 
        return output +"|"
      }
      let a = output.slice(0,-3)
      return a + " ||"
    }else{
      return output
    }
  }
}


export class Measure{
      notes: NoteClass[] = [];
      outputString = "";
      constructor(){}
      nBeats: number = 0;

      generateString(){
          return this.outputString;
      }
      addNotes(notes: Array<NoteClass>, beat:number){
        // console.log("I'm adding a note at " + beat + "on string: " + notes[0].gString + " and on fret " + notes[0].fret)
        if(notes.length==1){
          this.notes.push(notes[0]);
          this.outputString += `$${notes[0].gString} ${notes[0].fret} `;  
        }else{
          notes.forEach(note => {
            this.outputString += `$${note.gString}.${note.fret}.`
          });
          this.outputString+= " "
        }
        this.nBeats++;
      }

      addRest(beat: number){
        this.nBeats ++;
        this.outputString += "  "
      }
      isFull():boolean{
        if(this.nBeats >=8 ){
          this.outputString += "| "
        }
        return this.nBeats >= 8;
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