import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-tab-line',
  templateUrl: './tab-line.component.html',
  styleUrls: ['./tab-line.component.css']
})
export class TabLineComponent implements OnInit {
  message: String;
  @Input() childMessage: string;
  constructor() { }

  ngOnInit() {
    this.message = this.childMessage;
  }

}
