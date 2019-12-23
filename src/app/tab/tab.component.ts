import { Component, OnInit } from '@angular/core';


const HEROES = [
  {name: 'Dr IQ'},
  {name: 'Magneta'},
  {name: 'Bombasto'}
];

@Component({
  selector: 'app-tab',
  // template: `
  //   <app-tab-line [childMessage]="parentMessage">
  //   </app-tab-line>
  // `
  templateUrl: './tab.component.html',

})
export class TabComponent implements OnInit {
  tab_string =  "E / / / | Am / B / ||"; 
  tab_string2 =  "B C G D | Am / B / ||"; 


  heroes = HEROES;
  parentMessage ="ParentMessagee";
  constructor() { }
  tab = [
    {tab_string: 'E / / / | Am / B / ||'},
    {tab_string: 'G / / / | Bm / C / ||'},
    {tab_string: 'D / / / | Am / B / ||'}
  ];
  
  ngOnInit() {}

}
