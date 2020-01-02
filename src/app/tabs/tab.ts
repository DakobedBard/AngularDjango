export class TabLine{
    measures: Measure[] = []
    outputString;
    constructor(){

        let measure = new Measure([{
                gString:"e",
                fret:2,
                beat:2,
        }])
        this.measures.push(measure)
    }
    generateString(){
        this.measures.forEach(measure => {
            this.outputString += measure.measureString;
        });
        return this.outputString;
    }
}

export class Measure{
    notes;
    outputString;
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
        this.outputString += "$2 5 3 0 "
    }
    generateString(){
    }
    measureString(){
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