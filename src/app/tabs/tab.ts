import { TabLineComponent } from './tab-line/tab-line.component';

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

    generate(){
      let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))
      let beatmap: Map<number, Array<NoteClass>> = this.generateBeatMap()
      let measure:Measure = new Measure();
      let measures:Array<Measure> = []
      let tablines: Array<Tabline> = [];
      
      let nLines:number = Math.ceil( maximumBeats/32) 
      // console.log("maxbeats " + maximumBeats)
      // console.log("nlines: " + nLines)
      for(let i=0;i<nLines;i++){
        // console.log("hello " + i )
        for(let currentBeat = i*32; currentBeat < 32+(1+i); currentBeat ++){
          // console.log("The current beat is " + currentBeat)
          
          try{
            measure.addNotes(beatmap.get(currentBeat), currentBeat)
            console.log("I'm at beat " + currentBeat + " with a note  " + beatmap.get(currentBeat)[0].fret + " and a gstring of " + beatmap.get(currentBeat)[0].gString )
          }
          catch{
            measure.addRest(currentBeat);
          }
          measure = this.pushMeasureIfFull(measures,measure,currentBeat);
        }
        tablines.push(new Tabline(measures));
      }
      this.tablines = tablines
      // this.strs.push(this.measuresToString(measures)); 
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
        this.strs.push(tabline.toString())
      });
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
        output += measure.generateString();
    });
    return output
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
        this.outputString += " "
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