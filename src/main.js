(function(win) {
	win.content='分享内容';
	win.title='分享标题';

	// reload
    var loader = new win.resLoader({
        // presources: [
        //     "http://news.sohu.com/upload/yufeng/imgs2/bg0.jpg",
        //     "http://news.sohu.com/upload/yufeng/imgs2/loading.png"
        // ],
        resources: [
            "http://news.sohu.com/upload/yf/enenh5/imgs/end51.jpg",
            "http://news.sohu.com/upload/yf/enenh5/imgs/end52.jpg",
            "http://news.sohu.com/upload/yf/enenh5/imgs/end53.jpg"
        ],
        onProgress: function(current, total) {
            var percent = parseInt(current / total * 100) + '%';
            $('.pace-progress').text(percent);
        },
        onComplete: function(total) {
            $('#loading').hide();
            $('#content').show();
        }
    });
    loader.start();
})(window);