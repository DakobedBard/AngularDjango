import { Component, OnInit } from '@angular/core';
import { Tab, NoteClass } from  '../tab'
import { TabService } from '../tab.service';
declare const jtab: any;
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
  ngOnInit() {
    let tab: Tab = new Tab("Tab Create from UI",[],1)
    tab.addNote("1","G",1)
    tab.addNote("2","A",2)
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
    tab.addNote("6","G",32)
    tab.addNote("7","A",33)
    tab.addNote("8","G",35)
    tab.addNote("9","D",35)
    tab.addNote("10","A",36)
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
  this.strs = tab.strs;
  this.tabName = tab.name;

  this.strs.forEach((str,index) => {
    console.log("The " + index + " string is : " + str)
    jtab.render($(`#tabline${this.letters[index]}`),this.strs[index]);
  });
  console.log("")
  // jtab.render($(`#tabline${'a'}`),this.strs[0]);
  // jtab.render($(`#tabline${'b'}`),this.strs[0]);
  // jtab.render($('#mytab'),'Am7 C');    
  // this.strs.forEach((str,index) => {
  //   console.log("The div is " + `#tabline${this.letters[index]}`)
  //   jtab.render($(`#tabline${this.letters[index]}`),str);    
  // });

  }
}
