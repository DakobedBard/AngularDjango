import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TabService } from '../tabs/tab.service';
import { Tab } from '../tabs/tab'
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  tabs: any[];
  guitarTabs: Array<Tab>;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private tabService: TabService
    ) {
      this.getTabs()
     }
    refresh(): void{

    }
    getTabs(){
      this.tabs = []
      this.guitarTabs = []
      this.tabService.getTabs().subscribe(
        (data) => {
          for (const tab of (data as any)) {
            this.guitarTabs.push(new Tab(tab.name, tab.notes))
            this.tabs.push({
              notes: tab.notes,
              name:tab.name
            });
          }
          console.log("Lenght of guitar tabs is " + this.guitarTabs.length )
        },
        (err) => {  
          console.log(err);
        }
      );
    }
    getTab(){
      console.log("Lenght of guitar tabs is " + this.guitarTabs.length )
      return this.guitarTabs[0];
    }
    ngOnInit() {
      
    }
}
