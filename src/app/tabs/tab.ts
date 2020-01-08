export class Tab{

    beatsPerQuarterNote = 2;
    
    beatsPerMeasure = 8;
    measuresPerLine = 4;
    beatmap: Map<number, Array<NoteClass>>;
    nLines: number;
    beatsperline:number = 64;
    nMeasures: number;
    strs : Array<string>;
    constructor(public name:string,public notes: Array<NoteClass>, public id:number){
        this.strs = []
        this.generate()
        // this.generateTabStrings()

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

    measuresToString(measures: Array<Measure>):string{
      let output: string = "";
      measures.forEach(measures => {
        output += measures.generateString();
      });
      return output
    }

    generate(){
      let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))
      let beatmap: Map<number, Array<NoteClass>> = this.generateBeatMap()
      let beats: Array<number>;
      beats = Array.from(beatmap.keys()).reverse()
      let nextBeat:number = beats[0];

      let measure:Measure = new Measure();
      let measures:Array<Measure> = []
      // let notes: Array<NoteClass>;
      console.log("the upper limit is " + 64*Math.ceil(maximumBeats/64))
      console.log("the max limit is " + maximumBeats)
      beatmap.forEach((notes: Array<NoteClass>, beat: number) => {
        // console.log("The beat is at at " + beat + " and there are  " + notes.length + " notes ")
      });
      console.log("The nubmer of notes at beat 1 is " + beatmap.get(1).length)
      // beatmap.forEach(value:NoteClass[], key:number)
      for(let currentBeat = 0; currentBeat < 64 * Math.ceil(maximumBeats/64); currentBeat ++){
        try{
          measure.addNotes(beatmap.get(currentBeat), currentBeat)
        }
        catch{
          measure.addRest();
        }
        measure = this.pushMeasureIfFull(measures,measure,currentBeat);
      } 
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
        // console.log("I have pushed a measure at "  + beat);
        return new Measure(); 
      }
      return measure;
      

    }

}


export class Measure{
      notes: NoteClass[] = [];
      outputString = "";
      constructor(){}
      nBeats: number = 0;

      generateString(){
          return this.outputString + " |";
      }
      addNotes(notes: Array<NoteClass>, beat:number){
        // console.log("weherdsr " + notes.length)
        if(notes.length==1){
          console.log("I have added a note at " + beat);
          this.notes.push(notes[0]);
          this.outputString += `$${notes[0].gString} ${notes[0].fret}`;  
        }else{
          console.log("I have added notes at " + beat);
          notes.forEach(note => {
            this.outputString += `$${note.gString}.${note.fret}.`
          });
        }
        this.nBeats++;
      }


      addRest(){
        this.nBeats ++;
        this.outputString += " "
      }
      isFull():boolean{
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