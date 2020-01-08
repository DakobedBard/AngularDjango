import { Component, OnInit, Input } from '@angular/core';
declare const jtab: any;
import { Tab } from '../tab'
@Component({
  selector: 'app-tab-line',
  templateUrl: './tab-line.component.html',
  styleUrls: ['./tab-line.component.css']
})
export class TabLineComponent implements OnInit {
  message: String;
  div: string = "#tabline"
  @Input() tab_string: string;
  // @Input() div: string;
  constructor() { }

  ngOnInit() {
    let a: string = '#tabline'
    this.message = this.tab_string;
    jtab.render($(this.div),this.tab_string);
  }

}
