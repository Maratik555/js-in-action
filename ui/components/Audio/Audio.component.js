import {subscribe} from '../../../core/state-manager.js';
import {EVENTS} from '../../../core/constants.js';

export function AudioComponent() {
  const catchAudio = new Audio('assets/sounds/catch.wav');
  const missAudio = new Audio('assets/sounds/miss.mp3');

  subscribe(e => {
    if (e.name === EVENTS.GOOGLE_CAUGHT) {
      catchAudio.currentTime = 0;
      catchAudio.play();
    }
    if (e.name === EVENTS.GOOGLE_RUN_AWAY) {
      missAudio.play();
    }
  });

}