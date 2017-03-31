(function(global, factory){
    "use strict";
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = factory(global);
    }else{
        factory(global);
    }
})(typeof window !== undefined ? window : this, function(window){
    /* preload */
    function Preloader(config){
        return new Preloader.init(config);
    };
    Preloader.init = function(conf){
        this.resources = conf.resources || [],
        this.onProgress = conf.onProgress || null,
        this.onComplete = conf.onComplete || null;
        this.total = this.resources.length;
        this.loaded = 0;
        this.fails = 0;
    };
    Preloader.init.prototype.start = function(){
        this.loadImgs();
    };
    Preloader.init.prototype.loadImgs = function(){
        var _this = this;
        for(var i = 0; i <= this.resources.length - 1; i++){
        var img = new Image();
        img.onload = function(){
            ++_this.loaded == _this.total ? _this.onComplete(_this.total, _this.fails) : _this.onProgress( _this.loaded / _this.total );
        };
        img.onerror = function(){
            _this.fails ++;
            ++_this.loaded == _this.total ? _this.onComplete(_this.total, _this.fails) : _this.onProgress( _this.loaded / _this.total );
        };
        img.src = this.resources[i];
        }
    };
    /* ajax */
    var Ajax = function(options){
    if(!options){
        return
    }
    var url = options.url || "",
        type = options.type || "GET",
        data = options.data || null,
        asynchronous = options.asynchronous || true,
        success = options.success || function(){},
        fail = options.fail || function(){};

    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new window.XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xhr = new window.ActiveXObject();
    }
    else{
        throw new Error("Your browser does not support XMLHTTP");
    }

    var stateChange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var json = {};
                eval("json = " + xhr.responseText || {});
                success(json);
            }else{
                fail(xhr.status);
            }
            }else{
            fail(-1);
            }
        };

        if(xhr != null && url != ""){
            xhr.onreadystatechange = stateChange;
            xhr.open(type, url, asynchronous);
            xhr.send(JSON.stringify(data));
        }
    };
    /* 事件监听 */
    var EventListener = {
        addEvent : function(ele, tp, fn, capture){
            var capture = capture || false;
            if(ele.addEventListener){
                ele.addEventListener(tp, fn, capture);
            }
            else if(ele.attachEvent){
                ele.attachEvent("on" + tp, fn);
            }
            else{
                ele["on" + tp] = fn;
            }
        },
        removeEvent : function(ele, tp, fn, capture){
            var capture = capture || false;
            if(ele.removeEventListener){
                ele.removeEventListener(tp, fn, capture);
            }
            else if(ele.detachEvent){
                ele.detachEvent("on" + tp, fn);
            }
            else{
                ele["on" + tp] = null;
            }
        }
    };

    /* 函数节流 */
    var throttle = function(fn, delay){
        return function(){
            var _args = arguments;
            if(fn.tId == null){
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function(){
                fn.apply(this, _args);
                fn.tId = null;
            }, delay);
            }
        };
    };

    /* 分页 */
    function Page(opts){
        this.ele = opts.ele, // 当前ul
        this.total = opts.total, // 一共有多少个数据
        this.each = opts.each, // 每页显示多少个数据
        this.per = opts.per, // 最多显示多少个页数
        this.cur = 0, // 当前页数
        this.onPageChange = opts.onPageChange || function(){}; // 点击页数执行的事件

        var teach = this.total / this.each;
        this.pages = parseInt(teach) < teach ? parseInt(teach) + 1 : parseInt(teach); // 一共多少页
        this.per = this.per > this.pages ? this.pages: this.per; // 最多显示多少个页数
        this.appendChildren(this.getpageArr());

        var _this = this;
        EventListener.addEvent(this.ele, 'click', function(e){
            var e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var target = e.target || e.srcElement;
            var lis = _this.ele.getElementsByTagName('li');
            if( target.index !== undefined && target.index !== _this.cur ){
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                target.className = 'active';
                _this.cur = target.index;
                _this.appendChildren(_this.getpageArr());
                _this.onPageChange(target.index);
            }
        }, false);
    }
 
    Page.prototype.getpageArr = function(){
        var arr = [];
        if(this.cur == 0){ // 首页
            for (var i = 0; i < this.per; i++) {
                arr.push(i)
            }
        }else if(this.cur == (this.pages - 1)){ // 尾页
            for (var i = (this.pages - 1) - this.cur; i < this.pages; i++) {
                arr.push(i)
            }
        }else{ // 中间
            arr.push(this.cur - 1, this.cur, this.cur + 1);
        }
        return arr;
    }
    
    Page.prototype.appendChildren = function(arr){
        this.ele.innerHTML = "";
        // 根据arr和当前位置显示页数
        var lihead = document.createElement('li'),
        liend = document.createElement('li');
        lihead.innerHTML = "< 首页",
        liend.innerHTML = "尾页 >",
        lihead.index = 0,
        liend.index = arr[arr.length - 1];
        this.ele.appendChild(lihead);
        for (var i = arr[0]; i <= arr[arr.length - 1]; i++) {
            var li = document.createElement('li');
            li.index = i;
            li.innerHTML = (i+1);
            if( i == this.cur ) li.className = 'active';
            this.ele.appendChild(li);
        }
        this.ele.appendChild(liend);
    }

    
    window._page = Page,
    window.EventListener = EventListener,
    window.throttle = throttle,
    window.Ajax = Ajax,
    window.Preloader = Preloader;
});