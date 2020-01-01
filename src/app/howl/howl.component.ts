import { Component, OnInit } from '@angular/core';
import { HowlService } from '../howl.service'
@Component({
  selector: 'app-howl',
  templateUrl: './howl.component.html',
  styleUrls: ['./howl.component.css']
})
export class HowlComponent implements OnInit {
  index = 0;
  // elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn','prevBtn', 'nextBtn',
  //  'playlistBtn', 'volumeBtn', 'progress', 'bar','wave', 'loading', 'playlist', 
  //  'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
  //  window: any;

  constructor(howelService: HowlService){
    // this.elms.forEach(function(elm) {
    //   this.window[elm] = document.getElementById(elm);
    // });
  }
  
  playlist(songArray: any) {
       return songArray.length;
  }
  ngOnInit() {
    document.createElement('div1');
  }

}
