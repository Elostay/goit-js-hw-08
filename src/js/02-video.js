import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

let time = localStorage.getItem('videoplayer-current-time');

if (time != null) {
  player.setCurrentTime(time);
}
function getTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
}
player.on('timeupdate', throttle(getTime, 1000));
