import { Component, OnInit } from '@angular/core';
import { TabService } from  '../tab.service';

@Component({
  selector: 'app-tab',
  // template: `
  //   <app-tab-line [childMessage]="parentMessage">
  //   </app-tab-line>
  // `
  templateUrl: './tab.component.html',

})
export class TabComponent implements OnInit {

  constructor(private tabService: TabService) { }
  tab;
  
  ngOnInit() {
    this.tab = this.tabService.getTab()
  };

}
