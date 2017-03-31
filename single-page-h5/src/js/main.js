import '../scss/main.scss';
import Preloader from '../js/preload.js';
import Spv from '../js/share-pv.js';

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

let spv = new Spv({
  imgUrl: 'http://image.xinmin.cn/2016/10/11/4874815984702373600.jpg',
  link: window.location.href,
  title: '分享标题',
  content: '分享描述',
  appid: '',
  gSound: '',
  hm: 'c154d502f02b12a996c34a02281a3bff'
});

loader.start();
spv.init();