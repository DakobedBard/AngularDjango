import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chord-line',
  templateUrl: './chord-line.component.html',
  styleUrls: ['./chord-line.component.css']
})
export class ChordLineComponent implements OnInit {
  message: String;
  @Input() tab_string: string;
  constructor() { }

  ngOnInit() {
    this.message = this.tab_string;
  }

}
