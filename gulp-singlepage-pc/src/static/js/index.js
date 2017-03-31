(function(w){
    var menus = document.getElementsByClassName('menu')[0].getElementsByTagName('li'),
    secs = document.getElementsByClassName('rule-section'),
    menu = document.getElementsByClassName('menu')[0],
    rn = document.getElementsByClassName('rule-nav')[0],
    navs = rn.getElementsByTagName('li'),
    nav_pic = document.getElementById('nav-pic'),
    sld = document.getElementsByClassName('swiper-container')[0],
    pagination = document.getElementsByClassName('swiper-pagination')[0],
    vdo_nav = document.getElementsByClassName('vdo-nav')[0],
    vdo_navs = vdo_nav.getElementsByTagName('li'),
    ruleInd = 2,
    modal = document.getElementsByClassName('modal')[0],
    school_list = document.getElementsByClassName('school-list')[0],
    school_items = school_list.getElementsByTagName('li'),
    modal = document.getElementsByClassName('modal')[0],
    modal_mask = document.getElementsByClassName('modal-mask')[0],
    modal_title = modal.getElementsByClassName('modal-title')[0],
    modal_word = modal.getElementsByClassName('modal-word')[0],
    modal_video = modal.getElementsByClassName('modal-video')[0],
    swip = document.getElementsByClassName('swiper-container')[0];

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade',
        onInit: function(swiper){
            // 初始化
            swiper.disableTouchControl();
            // Preloader({
            //     resources: [
            //         './static/imgs/phone.png',
            //         './static/imgs/b1.jpg'
            //     ],
            //     onProgress: function(percent){},
            //     onComplete: function(t, e){
            //         swip.style.display = 'block';
            //     }
            // }).start();
            // 主菜单
            menus[swiper.activeIndex].className += ' active';
            for(var i = 0;i <= menus.length - 1; i++){
                menus[i].index = i;
            }
            menu.onMenuClick = function(e){       
                var e = e || w.event;
                var target = e.target || e.srcElement;
                e.preventDefault();
                e.stopPropagation();
                if(target.nodeName.toLowerCase() == 'li' || 'span'){     
                    target = target.nodeName.toLowerCase() == 'span' ? target.parentNode : target;
                    if( target.index != swiper.activeIndex){
                        swiper.slideTo(target.index);
                        EventListener.removeEvent(menu, 'click', menu.onMenuClick, false);
                    }
                }
            }
            EventListener.addEvent(menu, 'click', menu.onMenuClick, false);

            // 规则栏
            for(var i = 0; i <= secs.length - 1; i++){
                secs[i].range = [secs[i].offsetTop - 50, secs[i].offsetTop + secs[i].clientHeight];
            }
            for(var i = 0;i <= navs.length - 1; i++){
                navs[i].index = i;
            }
            EventListener.addEvent(rn, 'click', function(e){
                e = e || window.event;
                e.preventDefault();
                e.stopPropagation();
                var target = e.target || e.srcElement;
                if(target.nodeName.toLowerCase() == 'li'){
                    window.scrollTo(0, secs[target.index].range[0] + 80);
                }
            }, false);
            w.onscroll = throttle(function(e){
                if( swiper.activeIndex == ruleInd ){
                    var e = e || window.event;
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    for(var i = 0; i <= secs.length - 1; i++){
                        if( scrollTop >= secs[i].range[0] && scrollTop <= secs[i].range[1] ){
                            nav_pic.style.top = ( i * 50 + 10 ) + 'px';
                            for(var j = 0; j <= navs.length - 1; j++){
                                navs[j].className = '';
                            }
                            navs[i].className += ' active';
                            break;
                        }
                    }
                }
            }, 500);

            // 视频滚动菜单
            var vdo_content = document.getElementsByClassName('vdo-content')[0];
            function setVdoContent(dat){
                vdo_content.getElementsByTagName('video')[0].src = dat.video_url;
                vdo_content.getElementsByTagName('h1')[0].innerHTML = dat.title;
                vdo_content.getElementsByTagName('p')[0].innerHTML = dat.intro;
            }
            function setVdo(data){
                vdo_nav.innerHTML = "";
                vdo_data = data.data;
                for (var i = 0; i < vdo_data.length; i++) {
                    var li = document.createElement('li');
                    li.style.background = "url('"+vdo_data[i].img_url+"') no-repeat";
                    li.index = i;
                    vdo_nav.appendChild(li);
                    if(i == 0) setVdoContent(vdo_data[i])
                }
            }
            Ajax({
                url: "../data/videos.json",
                type: "GET",
                success: function(data){
                    setVdo(data);
                }
            });
            EventListener.addEvent(document.getElementsByClassName('vdo-nav-l')[0], 'click', function(e){
                e.preventDefault();
                var left = parseInt( vdo_nav.style.left.split('px')[0] );
                if( left !== 0 ) vdo_nav.style.left =  left + 229 + 'px';
            }, false);
            EventListener.addEvent(document.getElementsByClassName('vdo-nav-r')[0], 'click', function(e){
                e.preventDefault();
                var left = parseInt( vdo_nav.style.left.split('px')[0] );
                if( left >= -229 * (vdo_navs.length - 3) ) vdo_nav.style.left =  left - 229 + 'px';
            }, false);
            EventListener.addEvent(vdo_nav, 'click', function(e){
                e = e || window.e;
                var target = e.target || e.srcElement;
                if(target.nodeName.toLowerCase() == 'li'){
                    setVdoContent(vdo_data[target.index]);
                }
            }, false);

            // 模态框
            var showModal = function(dat){
                modal.style.display = 'block';
                modal_title.innerHTML = dat.title;
                if( dat.tp === 0 ){ // video
                    modal_video.src = dat.content;
                    modal_video.style.display = 'block';
                }else{
                    modal_word.innerHTML = dat.content;
                    modal_word.style.display = 'block';
                }
            }
            EventListener.addEvent(modal_mask, 'click', function(e){
                e.preventDefault();
                e.stopPropagation();
                modal.style.display = 'none';
                modal_video.style.display = 'none';
                modal_word.style.display = 'none';
            }, false);

            // 学院列表
            function setSchoolList(data){
                // 学院列表
                school_list.innerHTML = "";
                for (var i = 0; i < data.data.length; i++) {
                    var item = document.createElement('li');
                    item.innerHTML = '<img src="./static/imgs/school_vdo.png" width="33" height="21" alt="">'
                    +'<a href="javascript:;">'+data.data[i].title+'</a>'
                    +'<span>'+data.data[i].date+'</span>';
                    school_list.appendChild(item);
                }
                var school_items = school_list.getElementsByTagName('li');
                for (var i = 0; i < school_items.length; i++) {
                    school_items[i].index = i;
                }
            }
            Ajax({
                url: "../data/school0.json",
                type: "GET",
                success: function(data){
                    // 学院列表分页
                    var page = new _page({
                        ele: document.getElementsByClassName('pagination')[0],
                        total: data.total,
                        each: 2,
                        per: 5,
                        onPageChange: function(ind){
                            Ajax({
                                url: "../data/school"+ind+".json",
                                type: "GET",
                                success: function(data){
                                    setSchoolList(data);
                                }
                            });
                        }
                    });
                    setSchoolList(data);
                    EventListener.addEvent(school_list, 'click', function(e){
                        var e = e || w.event;
                        var target = e.target || e.srcElement;
                        e.preventDefault();
                        target = target.nodeName.toLowerCase() === 'span' || target.nodeName.toLowerCase() === 'img' || target.nodeName.toLowerCase() === 'a' ? target.parentNode : target;
                        showModal(data.data[target.index]);
                    }, false);
                },
                fail: function(status){}
            });
        },
        onSlideChangeStart: function(swiper){
            // 主菜单
            for(var i = 0;i <= menus.length - 1; i++){
                menus[i].className = '';
            }
            menus[swiper.activeIndex].className += 'active';
            // 进入或出游戏规则栏
            if( swiper.activeIndex == ruleInd ){
                sld.style.overflow = 'auto';
                sld.style.height = 'auto';
                pagination.style.display = 'none';
                rn.style.display = 'block';
                for(var j = 0; j <= navs.length - 1; j++){
                    navs[j].className = '';
                }
                navs[0].className += 'active';
                nav_pic.style.top = '10px';
            }else{
                sld.style.overflow = 'hidden';
                sld.style.height = '960px';
                pagination.style.display = 'block';
                rn.style.display = 'none';
                window.scrollTo(0,0);
            }
        },
        onSlideChangeEnd: function(swiper){
            EventListener.addEvent(menu, 'click', menu.onMenuClick, false);
        }
    });
})(window);