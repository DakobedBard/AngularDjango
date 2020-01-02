import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-line',
  templateUrl: './tab-line.component.html',
  styleUrls: ['./tab-line.component.css']
})
export class TabLineComponent implements OnInit {
  message: String;
  @Input() tab_string: string;
  constructor() { }

  ngOnInit() {
    this.message = this.tab_string;
  }

}
