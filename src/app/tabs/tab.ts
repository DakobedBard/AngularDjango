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
    // measuresAreEmpty(measures:Array<Measure>){
    //   if(measures.length==0){
    //     return true;
    //   }
    //   if(measures[0].notes.length>0)
    //     return false;
    //   else
    //     return this.measuresAreEmpty(measures.slice(1,measures.length))
    // }

    measuresToString(measures: Array<Measure>):string{
      let output: string = "";
      // console.log("There are " + measures.length + " measures ")
      measures.forEach((measure,index) => {
        console.log("measure " + index + " has " + measure.notes.length + " notes")
      });
      measures.forEach((measure,index) => {
        if(measure.notes.length==0){
          // if(this.measuresAreEmpty(measures.slice(index,measures.length))){
          //   console.log("yes")
          //   return output;
          // }
        }else{
          // console.log("the measure string is " + measure.generateString().length)
          output += measure.generateString();
        }
      });
      console.log("The output string is " + output);
      return output
    }

    generate(){
      let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))
      let beatmap: Map<number, Array<NoteClass>> = this.generateBeatMap()
      let measure:Measure = new Measure();
      let measures:Array<Measure> = []

      for(let currentBeat = 0; currentBeat < 32 * Math.ceil(maximumBeats/32); currentBeat ++){
        try{
          measure.addNotes(beatmap.get(currentBeat), currentBeat)
        }
        catch{
          measure.addRest(currentBeat);
        }
        measure = this.pushMeasureIfFull(measures,measure,currentBeat);
      }
      this.strs.push(this.measuresToString(measures)); 
      this.strs.push(this.measuresToString(measures)); 
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
        console.log("rest at " + beat)
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