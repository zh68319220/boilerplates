import Preloader from '../lib/preload.js';
import '../lib/adapt.js';
import '../lib/normal.css';
import '../css/main.scss';

let loader = new Preloader({
    resources: [
      "http://news.sohu.com/upload/yf/librate/imgs/p1.jpg"
    ],
    presources: [
      "http://news.sohu.com/upload/yf/librate/imgs/bg0.jpg"
    ],
    onProgress: function(current, total) {
        var percent = parseInt(current / total * 100) + '%';
        document.querySelector('.pace-progress').innerText = percent;
    },
    onComplete: function(total) {
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('.main').style.display = 'block';
    }
});
loader.start();
