import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor() { }
  tab = [
    {tab_string: 'E / / / | Am / B / ||'},
    {tab_string: 'G / / / | Bm / C / ||'},
    {tab_string: 'D / / / | Am / B / ||'},
  ];
  getTab(){
    return this.tab;
  };
}
