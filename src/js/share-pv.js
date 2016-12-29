class SPV{
  constructor(conf){
    this.imgUrl = conf.imgUrl,
    this.link = conf.link,
    this.title = conf.title,
    this.content = conf.content,
    this.appid = conf.appid,
    this.gSound = conf.gSound,
    this.hm = conf.hm; //c154d502f02b12a996c34a02281a3bff
  }

  init(){
    function shareFriend() {
      WeixinJSBridge.invoke("sendAppMessage", {
          appid: this.appid,
          img_url: this.imgUrl,
          img_width: "200",
          img_height: "200",
          link: this.link,
          desc: this.content,
          title: this.title
      }, function(b) {})
    }

    function shareTimeline() {
      WeixinJSBridge.invoke("shareTimeline", {
          appid: this.appid,
          img_url: this.imgUrl,
          img_width: "200",
          img_height: "200",
          link: this.link,
          desc: this.content,
          title: this.title
      }, function(b) {})
    }

    function shareWeibo() {
      WeixinJSBridge.invoke("shareWeibo", {
          content: this.content,
          url: this.link
      }, function(b) {})
    }
    document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
      WeixinJSBridge.on("menu:share:appmessage", function(b) {
        shareFriend();
      });
      WeixinJSBridge.on("menu:share:timeline", function(b) {
        shareTimeline();
      });
      WeixinJSBridge.on("menu:share:weibo", function(b) {
        shareWeibo();
      })
    }, false);

    var _hmt = _hmt || [];
    (function(hmn) {
      var hm = document.createElement("script");
      hm.src = "http://hm.baidu.com/hm.js?"+hmn;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })(this.hm);
  }
}

export default SPV;