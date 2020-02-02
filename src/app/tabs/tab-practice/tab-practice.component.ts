import { Component, OnInit } from '@angular/core';
import { Tab, NoteClass } from  '../tab'
import { TabService } from '../tab.service';
declare const jtab: any;
declare const Vex: any;
@Component({
  selector: 'app-tab-practice',
  templateUrl: './tab-practice.component.html',
  styleUrls: ['./tab-practice.component.css']
})
export class TabPracticeComponent implements OnInit {
  strs: Array<string> = []
  constructor(private tabService: TabService) { }
  letters = ['a','b','c','d','e','f','g','h','i'] // 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z']
  tabName: string;
  postTab(){
    let tab: Tab = new Tab("Tab Create from UI", 
      [new NoteClass('2','G',1), new NoteClass('3','G',3),new NoteClass('2','G',1), new NoteClass('3','A',4),new NoteClass('2','G',6), new NoteClass('3','G',8)
      ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),
      new NoteClass('2','G',18), new NoteClass('3','G',20),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34)],1)
    this.strs = tab.strs;
    this.tabName = tab.name;
    this.tabService.postTab(tab).subscribe(
    (data) => {
      console.log("The data is " + data)
    },
    (err) => {  
      console.log(err);
    })
  }
  public VF;
  ngOnInit() {
    let tab: Tab = new Tab("Tab Create from UI",[],1)
    tab.addNote("0","A",0)
    tab.addNote("0","G",0)
    tab.addNote("1","A",1)
    // tab.addNote("2","A",1)
    tab.addNote("2","A",2)
    tab.addNote("3","G",2)

    tab.addNote("3","D",3)
    tab.addNote("4","D",4)
    tab.addNote("5","A",5)
    tab.addNote("4","G",6)
    tab.addNote("3","G",7)
    tab.addNote("2","G",8)
    tab.addNote("1","E",9)
    tab.addNote("2","G",10)
    tab.addNote("3","D",12)
    tab.addNote("4","G",13)
    tab.addNote("5","D",14)
    tab.addNote("6","G",15)
    tab.addNote("7","A",16)
    tab.addNote("8","G",17)
    tab.addNote("9","D",19)
    tab.addNote("10","A",20)
    tab.addNote("8","G",22)
    tab.addNote("8","G",23)
    tab.addNote("4","A",24)
    tab.addNote("7","G",25)
    tab.addNote("8","G",26)
    tab.addNote("5","G",27)
    tab.addNote("4","D",28)
    tab.addNote("3","A",29)
    tab.addNote("4","G",30)
    tab.addNote("5","D",31)
    tab.addNote("5","G",31)
    
    tab.addNote("6","A",32)
    tab.addNote("5","D",32)

    tab.addNote("7","A",33)
    tab.addNote("7","A",34)
    tab.addNote("8","G",35)
    tab.addNote("9","D",35)
    tab.addNote("10","A",36)
    tab.addNote("7","A",37)
    tab.addNote("8","A",38)
    tab.addNote("8","G",39)
    tab.addNote("4","A",40)
    tab.addNote("3","G",41)
    tab.addNote("3","G",42)
    tab.addNote("5","B",43)
    tab.addNote("4","B",44)
    tab.addNote("3","B",45)
    tab.addNote("4","B",46)

    tab.generate()
    tab.generateStrings()
    // [new NoteClass('2','G',1), new NoteClass('3','G',3),new NoteClass('2','G',1), new NoteClass('3','A',4),new NoteClass('2','G',6), new NoteClass('3','G',8)
    // ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),new NoteClass('2','G',18), new NoteClass('3','G',20)
    // ,new NoteClass('2','A',22), new NoteClass('3','D',24),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34), new NoteClass('4','D',36),new NoteClass('2','G',42), new NoteClass('3','G',46),
    // new NoteClass('2','G',48), new NoteClass('3','G',50),new NoteClass('2','G',52), new NoteClass('3','A',53),new NoteClass('2','G',58), new NoteClass('3','G',62)],1)
// Create a tab stave of width 400 at position 10, 40 on the canvas.

  this.VF = Vex.Flow;
  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.getElementById("boo")
  var renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
  // Create a tab stave of width 400 at position 10, 40 on the canvas.
var stave = new this.VF.TabStave(10, 40, 400);
var stave2 = new this.VF.TabStave(10, 140, 400);
// Size our svg:
renderer.resize(500, 500);

// And get a drawing context:
var context = renderer.getContext();
stave.addClef("tab").setContext(context).draw();
stave2.addClef("tab").setContext(context).draw();
var notes = [
    // A single note
    new this.VF.TabNote({
      positions: [{str: 3, fret: 7}],
      duration: "q"}),
    // A chord with the note on the 3rd string bent
    new this.VF.TabNote({
      positions: [{str: 2, fret: 10},
                {str: 3, fret: 9}],
      duration: "q"}),
    // A single note with a harsh vibrato
    new this.VF.TabNote({
      positions: [{str: 2, fret: 5}],
      duration: "h"})
    ];
    this.VF.Formatter.FormatAndDraw(context, stave, notes);
  }
}

