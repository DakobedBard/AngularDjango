import { Component, OnInit } from '@angular/core';
import { Tab, NoteClass } from  '../tab'
import { TabService } from '../tab.service';
@Component({
  selector: 'app-tab-practice',
  templateUrl: './tab-practice.component.html',
  styleUrls: ['./tab-practice.component.css']
})
export class TabPracticeComponent implements OnInit {
  strs: Array<string> = []
  constructor(private tabService: TabService) { }
  tabName: string;
  postTab(){
    let tab: Tab = new Tab("Tab Create from UI", 
      [new NoteClass('2','G',1), new NoteClass('3','G',3),new NoteClass('2','G',1), new NoteClass('3','A',4),new NoteClass('2','G',6), new NoteClass('3','G',8)
      ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),new NoteClass('2','G',18), new NoteClass('3','G',20)
      ,new NoteClass('2','A',22), new NoteClass('3','D',24),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34), new NoteClass('4','D',36),new NoteClass('2','G',42), new NoteClass('3','G',46),
      new NoteClass('2','G',48), new NoteClass('3','G',50),new NoteClass('2','G',52), new NoteClass('3','A',53),new NoteClass('2','G',58), new NoteClass('3','G',62)
      ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),new NoteClass('2','G',18), new NoteClass('3','G',20)
      ,new NoteClass('2','A',22), new NoteClass('3','D',24),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34), new NoteClass('4','D',36),new NoteClass('2','G',18), new NoteClass('3','G',20)],1)
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
    let tab: Tab = new Tab("Tab Create from UI", 
    [new NoteClass('2','G',1), new NoteClass('3','G',3),new NoteClass('2','G',1), new NoteClass('3','A',4),new NoteClass('2','G',6), new NoteClass('3','G',8)
    ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),new NoteClass('2','G',18), new NoteClass('3','G',20)
    ,new NoteClass('2','A',22), new NoteClass('3','D',24),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34), new NoteClass('4','D',36),new NoteClass('2','G',42), new NoteClass('3','G',46),
    new NoteClass('2','G',48), new NoteClass('3','G',50),new NoteClass('2','G',52), new NoteClass('3','A',53),new NoteClass('2','G',58), new NoteClass('3','G',62)
    ,new NoteClass('2','A',8), new NoteClass('3','D',10),new NoteClass('2','G',12), new NoteClass('3','G',14),new NoteClass('2','A',16), new NoteClass('3','D',17),new NoteClass('2','G',18), new NoteClass('3','G',20)
    ,new NoteClass('2','A',22), new NoteClass('3','D',24),new NoteClass('2','G',28), new NoteClass('2','G',32),new NoteClass('2','A',34), new NoteClass('4','D',36),new NoteClass('2','G',18), new NoteClass('3','G',20)],1)
  this.strs = tab.strs;
  this.tabName = tab.name;

  }
}
