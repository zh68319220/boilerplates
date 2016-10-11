import Preloader from '../lib/preload.js';
import '../lib/adapt.js';

import '../lib/preload.css';
import '../css/main.scss';

let loader = new Preloader({
    resources: [
      "http://image.xinmin.cn/2016/10/11/6150190064053734729.jpg",
      "http://image.xinmin.cn/2016/10/11/4874815984702373600.jpg"
    ],
    presources: [
      "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"
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
