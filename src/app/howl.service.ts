import { Injectable } from '@angular/core';
// import { SiriWave} from '../js/siriwave'
@Injectable({
  providedIn: 'root'
})
export class HowlService {
  playlist : any;
  // wave: SiriWave;
  constructor() { 
   this.playlist=  {
      title: 'song',
      file: 'song.wav',
      howl: null
    }
    // this.wave = this.createWave
  }

  // createWave(){
  //   return new SiriWave({
  //     container: waveform,
  //     width: window.innerWidth,
  //     height: window.innerHeight * 0.3,
  //     cover: true,
  //     speed: 0.03,
  //     amplitude: 0.7,
  //     frequency: 2
  //   });
  // }

}
