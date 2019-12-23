import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor() { }
  tab = [
    {tab_string: '$4.7/9.$3.6/8.$2.5/7 9p7 $2.9.$3.9.$4.9 ||'},
    {tab_string: 'G / / / | Bm / C / ||'},
    {tab_string: 'D / / / | Am / B / ||'},
  ];
  getTab(){
    return this.tab;
  };
}
