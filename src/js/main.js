window.onload = function(){

	var swiper = new Swiper('.swiper-container',{ });

	function contentLoad () {
		$(".content").each(function (i, ele) {
			(function (i, ele) {
				setTimeout(function(){
					ele.css({"-webkit-transition": "all .5s ease-in", "transition": "all .5s ease-in", "opacity": "1"});
				}, 500*(i%3));
			})(i, $(this));
		});
	}
	function setQuestion (ind) {
		$(".question").text(questions[ind].qes);
		current_ind = ind;
		var sel = -1;
		$.each(answers,function(n,value) {
			if(value.qes_ind == current_ind){
				sel = value.key;
			}
		});
		$(".sels").each(function (i, ele) {
			$(this).text(questions[ind].sels[i]);
			if(i == sel){
				$(this).addClass("sel");
			}
			else{
				$(this).removeClass("sel");
			}
		});
		modal(false);
	}
	function modal (close) {
		$(".mask").removeAttr('style');
		if(close){
			$(".modal").css('display','none');
			$(".mask").css('display','none');
		}
		else{
			$(".mask").css('display','block');
			$(".modal").css('display','block');
		}
	}
	function back(ind) {
		answers = [];
		current_ind = 0;
		$(".guessed").addClass("guess");
		$(".guessed").text("");
		$(".guessed").removeClass("guessed");
		$(".content").each(function (i, ele) {
			$(this).removeAttr("style");
		});
		$(".estimate").removeAttr("style");
		swiper.slideTo(ind, 0, false);
		fadein();
		contentLoad();
	}
	//operation events
	$(".inv-btn").on("click", function () {
        //move to scene2
        $('.page-slide1').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(-140px,0)"});
        $('.page-slide2').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(-160px,284px)"});
        $('.page-slide3').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(140px,0)"});
        $('.main').css({"-webkit-transition":"all .5s linear","opacity": "0"});
        $('.scene1').css({"-webkit-transition":"all .5s linear","opacity": "0", "display":"none"});
        setTimeout(function(){
            $('.page-slide1').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(0,0)"});
            $('.page-slide2').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(0,0)"});
            $('.page-slide3').css({"-webkit-transition":"all .5s linear","-webkit-transform":"translate(0,0)"});
            $('.main').css({"-webkit-transition":"all .5s linear","opacity": "1"});
            $('.scene2').css({"-webkit-transition":"all .5s linear","opacity": "1", "display":"block"});
            var music = document.getElementById('musicBg');
        	music.play();
        }, 1000);
        setTimeout(function(){
            $('#meta-btn').css({"-webkit-animation": "twinkle 3s linear infinite", "animation": "twinkle 3s linear infinite"});
            $('#secret-btn').css({"-webkit-animation": "twinkle 3s linear infinite", "animation": "twinkle 3s linear infinite"});
            $('#ah-btn').css({"-webkit-animation": "twinkle 3s linear infinite", "animation": "twinkle 3s linear infinite"});
        }, 2000);
    });
	$("#meta-btn").on("click", function () {
		swiper.slideTo(1, 0, false);
		contentLoad();fadein();
	});
	$("#secret-btn").on("click", function () {
		swiper.slideTo(2, 0, false);
		contentLoad();fadein();
	});
	$("#ah-btn").on("click", function () {
		swiper.slideTo(3, 0, false);
		contentLoad();fadein();
	});
	$(".opts").on("click", function () {
		if($(this).attr('data-index') == 1){
			swiper.slideTo(6, 0, false);fadein();
		}
		else if($(this).attr('data-index') == 2){
			swiper.slideTo(5, 0, false);fadein();
		}
		else if($(this).attr('data-index') == 3){
			swiper.slideTo(4, 0, false);fadein();
		}else{ }
		var ind = $(this).attr('data-index');
		$(".guess").each(function(i, ele){
			$(this).on("click", function () {
				$(".mask").css('display','block');
				$(".modal").css('display','block');
				setQuestion($(this).attr("index"));
			});
			if( $(this).attr("index") < ind * 8 && $(this).attr("index") >= (ind-1) * 8 ){
				(function (i, ele) {
					setTimeout(function(){
						ele.css({"-webkit-animation": "guess-out .6s linear 1", "animation": "guess-out .6s linear 1"});
					}, 200*(i%8));
				})(i, $(this));
			}
		});
	});
	$(".sels").on("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		addable = true;
		key = $(this).attr("index");
		$.each(answers,function(n,value) {
			if(value.qes_ind.toString() == current_ind.toString()){
				value.key = key;
				addable = false;
			}
		});
		if(addable){ 
			answers.push(
				{
					'qes_ind': current_ind,
					'key': key
				}
			);
		}
		if($(this).has('img').length==0){
			// modal(true);
			if( key == questions[current_ind].key ){
				$(this).append("<img class='right' src='http://news.sohu.com/upload/yufeng/shishang5/imgs/right.png'>");
			}
			else{
				$(this).append("<img class='right' src='http://news.sohu.com/upload/yufeng/shishang5/imgs/wrong.png'>");
			}
		}
		$(".sels").removeClass("sel");
		$(this).addClass("sel");
		$(".guess[index='"+ current_ind +"']").addClass("guessed");
		$(".guess[index='"+ current_ind +"']").removeClass("guess");
		$(".guessed[index='"+ current_ind +"']").text($(this).text());
	});
	$(".mask").on("click", function () {
		modal(true);
	});
	$(".modal").on("click", function () {
		modal(true);
	});
	$(".friend").on("click", function () {
		swiper.slideTo(8, 500, false);
	});
	$(".again").on("click", function () {

		var music = document.getElementById('musicBg');
        music.play();
        
		answers = [];
		current_ind = 0;
		$(".guessed").addClass("guess");
		$(".guessed").text("");
		$(".guessed").removeClass("guessed");
		$(".content").each(function (i, ele) {
			$(this).removeAttr("style");
		});
		$(".estimate").removeAttr("style");
		swiper.slideTo(0, 0, false);fadein();
	});
	$(".confirm").on("click", function () {
		corrects = 0;
		$.each(answers,function(n,value) {
			if(questions[value.qes_ind].key == value.key){
				corrects ++;
			}
		});
		if(answers.length == 0){
			$(".score").text(0);
			$(".estimate").text("胖友，世界那么大，常来搜狐时尚看看");
		}
		else{
			score = parseInt( (corrects/8).toFixed(2) * 100 );
			$(".score").text(score);
			if(score < 60){
				$(".estimate").text("胖友，世界那么大，常来搜狐时尚看看");
			}
			else if(score >= 60 && score < 80){
				$(".estimate").text("时尚边缘人，来搜狐时尚教你小钱装出高逼格");
			}
			else if(score >= 80 && score < 90){
				$(".estimate").text("你和高圆圆就差一个赵又廷，不以风骚惊天下，但以颜值动世人");
			}
			else if(score >= 90){
				$(".estimate").text("宇宙为你闪耀，王凯为你倾倒，不靠女人，照样稳坐时尚头条");
			}else{}
		}
		$(".estimate").css({"-webkit-animation": "est .5s linear 1"});
		if( $(this).parent().attr("data-index") == 4 ){
			$(".again-left").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-pt.png')"});
			$(".again-right").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-secret.png')"});
			$(".again-left").on("click", function () { back(1); });
			$(".again-right").on("click", function () { back(2); });
		}
		else if( $(this).parent().attr("data-index") == 5 ){
			$(".again-left").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-wedding.png')"});
			$(".again-right").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-pt.png')"});
			$(".again-left").on("click", function () { back(3); });
			$(".again-right").on("click", function () { back(1); });
		}
		else if( $(this).parent().attr("data-index") == 6 ){
			$(".again-left").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-wedding.png')"});
			$(".again-right").css({"background": "url('http://news.sohu.com/upload/yufeng/shishang5/imgs/btn-secret.png')"});
			$(".again-left").on("click", function () { back(3); });
			$(".again-right").on("click", function () { back(2); });
		}else{}
		swiper.slideTo(7, 0, false);fadein();
	});
	$(".page-share").on("click touchend", function () {
		swiper.slideTo(7, 500, false);
	});
	$(".close").on("click", function () {
		modal(true);
	});

	// questions and answers
	var questions = [
		{
			"qes": 'Christopher Bu定制“紫禁城”墨绿色刺绣斗篷礼服',
			"sels": ["￥1200万","￥120万","￥12万","￥1.2万"],
			"key": 1,
		},
		{
			"qes": '巴黎欧莱雅大眼甜心睫毛膏',
			"sels": ["￥25","￥125","￥325","￥525"],
			"key": 1,
		},
		{
			"qes": '萧邦黄钻耳钉',
			"sels": ["￥2万","￥5万","￥10万","￥100万"],
			"key": 2,
		},
		{
			"qes": '巴黎欧莱雅纷泽滋润唇膏#301',
			"sels": ["￥95","￥105","￥298","￥358"],
			"key": 1,
		},
		{
			"qes": '巴黎欧莱雅纷泽琉光奢润唇釉#204',
			"sels": ["￥25","￥125","￥325","￥525"],
			"key": 1,
		},
		{
			"qes": '萧邦黄钻戒指',
			"sels": ["￥10万","￥15万","￥20万","￥50万"],
			"key": 2,
		},
		{
			"qes": 'Louis Vuitton手拿包',
			"sels": ["￥8000","￥12000","￥28000","￥40000"],
			"key": 3,
		},
		{
			"qes": '巴黎欧莱雅复颜立体纤颜精华乳',
			"sels": ["￥240","￥340","￥440","￥540"],
			"key": 0,
		},
		{
			"qes": 'Lily Aldridge 走秀身价',
			"sels": ["$1百万","$2百万","$3百万","$5百万"],
			"key": 1,
		},
		{
			"qes": 'CPB肌肤之钥瑰丽唇膏#311',
			"sels": ["￥220","￥660","￥880","￥990"],
			"key": 1,
		},
		{
			"qes": '海瑞温斯顿绮隐Secret Cluster高级珠宝系列钻石项链',
			"sels": ["￥30万","￥50万","￥100万","￥150万"],
			"key": 2,
		},
		{
			"qes": 'TOM FORD致臻无痕粉底液#01',
			"sels": ["￥500","￥700","￥900","￥1100"],
			"key": 1,
		},
		{
			"qes": 'YSL圣罗兰鸦片女士香水热吻红唇限量版',
			"sels": ["￥890","￥980","￥1150","￥1250"],
			"key": 2,
		},
		{
			"qes": 'valentino网格镶钻罗马靴',
			"sels": ["￥7988","￥10200","￥15988","￥20800"],
			"key": 1,
		},
		{
			"qes": '伯爵Rose Passion18K白金指环',
			"sels": ["￥3万","￥5万","￥8万","￥12万"],
			"key": 3,
		},
		{
			"qes": '宝格丽DIVA系列密镶钻白金手镯',
			"sels": ["￥10万","￥30万","￥50万","￥80万"],
			"key": 2,
		},
		{
			"qes": 'Dior迪奥凝脂恒久粉底液',
			"sels": ["￥298","￥420","￥590","￥998"],
			"key": 2,
		},
		{
			"qes": 'Dior迪奥金艳幻彩唇膏',
			"sels": ["￥95","￥350","￥520","￥798"],
			"key": 1,
		},
		{
			"qes": 'Baby冠冕：CHAUMET孤品',
			"sels": ["￥1百万","￥3百万","￥1千万","无价"],
			"key": 3,
		},
		{
			"qes": 'Dior迪奥幽蓝魅惑单色眼影',
			"sels": ["￥310","￥520","￥628","￥998"],
			"key": 0,
		},
		{
			"qes": 'Baby钻戒：CHAUMET Josephine的加冕－爱系列',
			"sels": ["￥1百万","￥3百万","￥5百万","￥1千万"],
			"key": 3,
		},
		{
			"qes": '黄晓明礼服：TOM FORD高级定制',
			"sels": ["￥1万","￥3万","￥5万","￥8万"],
			"key": 1,
		},
		{
			"qes": 'Baby婚纱：迪奥创意总监拉夫·西蒙（Raf·Simons）主持设计',
			"sels": ["￥10万","￥50万","￥100万","￥120万"],
			"key": 2,
		},
		{
			"qes": 'Baby婚鞋：Jimmy Choo的灰姑娘水晶鞋',
			"sels": ["￥9800","￥23000","￥38000","￥45000"],
			"key": 2,
		}
	];
	var answers = [];
	var current_ind = 0;
	var rightA = false;
}