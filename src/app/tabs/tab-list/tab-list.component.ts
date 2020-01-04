import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service'
@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.css']
})
export class TabListComponent implements OnInit {

  tabs: any[] = [];
  constructor(private tabService: TabService) { 
  }

  getTabs(){
    this.tabService.getTabs().subscribe(
      (data) => {
      for (const tab of (data as any)) {
        this.tabs.push({
          notes: tab.notes,
          name:tab.name
        });
      }
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
