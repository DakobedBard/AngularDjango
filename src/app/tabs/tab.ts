export class TabLine{
    measures: Array<Measure>;
    constructor(){
    }
}

export class Measure{
    notes;
    constructor(notes){
        this.notes = notes;
    }
    generateString(){

    }
    measureString(){
        // Return a string representation of the measure..
    }
}

export class Note{
    fret;
    gString;
    noteLength;
    beat;
    constructor(fret, gString, noteLength, beat){
        this.gString = gString;
        this.fret = fret;
        this.noteLength = noteLength
        this.beat = beat
    }
}