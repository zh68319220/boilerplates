/**
 * http get方法
 * @param  url  url路径
 * @param  asynchronous 是否异步
 * @param  success  回调函数
 */
let _get = function(url, asynchronous, success){
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('Get', url, asynchronous);
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      if(xmlhttp.status == 200){
        success(JSON.parse(xmlhttp.responseText));
      }
    }
  }
  xmlhttp.send();
};

/**
 * jsonp请求
 * @param  url  url路径
 * @param  asynchronous 是否异步
 * @param  success  回调函数
 */
let _getCOR = function(url){
  let script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

let Actions = {};

/**
 * 获取电影详情数据
 * @param  url url路径
 * @param  asynchronous 是否异步
 * @param  success 回调函数success
 */
Actions._getFilmDetail = function(id, asynchronous, success){
  _get('./data/film/1.json', asynchronous, success);
};

/**
 * 获取正在上映的电影数据
 * @param  asynchronous 是否异步
 * @param  success 回调函数success
 */
Actions._getFilms = function(asynchronous, success){
  _get('./data/now-playing.json', asynchronous, success);
}

export default Actions;