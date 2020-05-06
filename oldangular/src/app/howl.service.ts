import { Injectable } from '@angular/core';
import { skipPartiallyEmittedExpressions } from 'typescript';
// import { SiriWave} from '../js/siriwave'
@Injectable({
  providedIn: 'root'
})
export class HowlService {
  playlist : any;
  // wave: SiriWave;
  constructor() { 
   this.playlist=  [{
      title: 'songHello',
      file: 'song.wav',
      howl: null
    }]
    this.createPlayList()
  }
  createPlayList(){
      // Setup the playlist display.
      this.playlist.forEach(function(song) {
        var div = document.createElement('div');
        div.className = 'list-song';
        div.innerHTML = song.title;
        console.log("song: " + song.title)
        div.onclick = function() {
          // this.skipTo(playlist.indexOf(song));
        };
      })
      // list.appendChild(div);
    
  }
}


