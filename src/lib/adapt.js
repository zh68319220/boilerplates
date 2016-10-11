/*
  adapt different mobile devices using rem.
*/
(function(win) {
    var doc = win.document,
        docEl = doc.documentElement,
        screenWidth =  parseInt(docEl.clientWidth),
        tid;
    var phoneScale = screenWidth/640;
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)){
        var version = parseFloat(RegExp.$1);
        if(version>2.3){
            document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'">');
        }else{
            document.write('<meta name="viewport" content="width=640">');
        }
    } else {
        document.write('<meta name="viewport" content="width=device-width, user-scalable=no">');
    };

    function refreshRem() {
        screenWidth =  parseInt(docEl.clientWidth);
        if (screenWidth > 640) { // 最大宽度
            screenWidth = 640;
        }
        var rem = screenWidth / 10; // 将屏幕宽度分成10份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
        win.rootFont = rem;
    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);
