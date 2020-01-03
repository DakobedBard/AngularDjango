import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
    ) { }

    refresh(): void{

    }

    ngOnInit() {
      
    }


}
