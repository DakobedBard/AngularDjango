import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service'
@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.css']
})
export class TabListComponent implements OnInit {
  tabService: TabService
  tabs: any[] = [];
  constructor(tabService: TabService) { 
    this.tabService = tabService;
  }

  getTabs(){
    this.tabService.getTabs().subscribe(
      (data) => {
      console.log("The data is ! " + data)
      for (const tab of (data as any)) {
        this.tabs.push({
          notes: tab.notes,
          name:tab.name
        });
      }
      console.log("why")
      this.tabs.forEach(tab => {
        console.log("first tab is " + tab.name)
      });
      },
      (err) => {  
        console.log(err);
      }
    );
  }
  ngOnInit() {
    this.getTabs()
  }
  tabDetail(){
    console.log("Tab detail")
  }

}
