export class Tab{
    lines : TabLine[] = [];
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
      beats = Array.from(beatmap.keys())
      let nextBeat:number = beats.pop()


      let measure:Measure = new Measure();
      let measures:Array<Measure> = []
      let notes: Array<NoteClass>;
      
      
      for(let currentBeat = 0; currentBeat < Math.ceil(maximumBeats/64); currentBeat ++){
        if(currentBeat<nextBeat){
          console.log("current beat:" + currentBeat + " nextBeat " + nextBeat) 
          measure.addRest();
        }else{
          notes = beatmap[nextBeat];
          measure.addNotes(notes, currentBeat);
          if(beats.length==0){
            console.log("No beats left");
            return
          }
          nextBeat = beats.pop()
        }
        measure = this.pushMeasureIfFull(measures,measure,currentBeat);  
        
      }


    }



    // generateMeasures( beatMap: Map<number,Array<NoteClass>>, lineIndex:number):Array<Measure>{
    //   let currentBeat: number = 0;
    //   beatMap.forEach((notes: Array<NoteClass>, beat: number) => {
    //   });
    //   let n: number = 0
    //   let measure: Measure = new Measure()
    //   let measures: Array<Measure> = []
    //   beatMap.forEach((noteArray,beat) => {
    //     console.log("beat: " + beat + " and the currentBeat is " + currentBeat)
    //     console.log("beat - cuyr") 
    //     if(beat>currentBeat){
    //       for (let i = 0; i < beat-currentBeat; i++) {
    //         measure.addRest()
    //         // console.log("I have added a rest at beat: " + currentBeat); 
    //         measure = this.pushMeasureIfFull(measures, measure, currentBeat)
    //         currentBeat++;
    //       }
    //     }else{     
    //       console.log("Do i get here ")     
    //       if(noteArray.length>1){
    //         measure.addNotes(noteArray,currentBeat)
    //         console.log("I have added a chord at beat: " + currentBeat); 
    //         measure = this.pushMeasureIfFull(measures, measure, currentBeat)
    //         currentBeat++;
    //       }else{
    //         measure.addNotes(noteArray[0], currentBeat)
    //         console.log("I have added a note at beat: " + currentBeat); 
    //         measure = this.pushMeasureIfFull(measures, measure, currentBeat)
    //         currentBeat++
    //       }
    //     }
    //   });

    //   return measures;
    // }

    pushMeasureIfFull(measures: Array<Measure>, measure: Measure, beat:number): Measure{
      
      if(measure.isFull()){
        measures.push(measure)
        console.log("I have pushed a measure at "  + beat);
        return new Measure(); 
      }
      return measure;
      

    }

    checkMeasure(measure: Measure, measures: Array<Measure>){
      if(measure.isFull){
        measures.push(measure)
      }
      // Returns true 
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
  }
    // iteratebeats(map: Map<number, Array<NoteClass>>):Array<Measure>{
    //     let measureArray: Measure[] = []
    //     let measure = new Measure()
    //     let currentBeat = 0;
    //     let maximumBeats = Math.max.apply(Math, this.notes.map(function(note) { return note.beat; }))
    //     this.nMeasures = Math.ceil(maximumBeats/8)
    //     this.nLines = Math.ceil(this.nMeasures/4) 
    //     // console.log("There will be x number of measures " + this.nMeasures);
    //     // console.log("There will be x number of lines " + this.nLines);
    //     let enddBeatCurrentLine = this.nMeasures * this.beatsPerQuarterNote;
    //     let measureIndex = 0;
    //     map.forEach((noteArray,beat) => {
    //       if(beat>currentBeat){
    //         for (let i = 0; i < beat-currentBeat; i++) {
    //           measure.addRest()
    //         }
    //       }
    //       currentBeat = beat;
    //       if(noteArray.length==1){
    //         measure.addNote(noteArray[0]);
    //       }else{
    //         measure.addNotes(noteArray);
    //       }
    //     });
    //     measureArray.push(measure);
    //     return measureArray;
    // }
    // generateLines(){
  //       let measures: Measure[] = this.iteratebeats(this.generateBeatMap());
  //       let line = new TabLine(measures);
  //       this.lines.push(line)
  //   }
  //  generateStrings(){
  //     this.lines.forEach(line => {
  //       this.strs.push(line.toString())
  //       this.strs.push(line.toString())
  //       this.strs.push(line.toString())
  //     });      
  //   }
  // getLines(){
  //       return this.lines;
  //   }


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
      nBeats: number = 0;

      generateString(){
          return this.outputString + " |";
      }
      addNotes(notes: Array<NoteClass>, beat:number){
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