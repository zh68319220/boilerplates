import React, {Component} from 'react';
import { Link } from 'react-router';
import './slide.scss';

import sld_1 from '../../imgs/sld_1.jpg';
import sld_2 from '../../imgs/sld_2.jpg';

class Slide extends Component{
	constructor(){
		super();
		this.pageX = 0;
		this.translateX = 0;
	}
	componentDidMount() {
		var _slide = document.querySelector(".slide"),
		_this = this;
		_slide.style.width = _slide.getElementsByTagName('li').length*document.body.clientWidth+"px";
		_this.slide = _slide;
		_this.slide.addEventListener("transitionend", function(e) {
			_slide.style.transition = "";
		});
		_this.loop = setInterval(function(){
			if( _this.translateX == -parseInt(_this.slide.style.width) + document.body.clientWidth  ){
				_this.translateX = 0;
				_this.slide.style.transform = "translate3d(0px, 0, 0)";
				_this.slide.style.transition = "all ease-in .3s";
			}
			else{
				_this.translateX -= parseInt(document.body.clientWidth);
				_this.slide.style.transform = "translate3d("+_this.translateX+"px, 0, 0)";
				_this.slide.style.transition = "all ease-in .3s";
			}
		}, 3000);
	}
	onTouchStart(e) {
		e.preventDefault();
		e.stopPropagation();
		clearInterval(this.loop);
		this.pageX = e.touches[0].pageX;
	}
	onTouchMove(e) {
		e.preventDefault();
		e.stopPropagation();
		if( e.touches[0].pageX - this.pageX <= 0 ){
			this.translateX -= (this.pageX - e.touches[0].pageX);
		    this.slide.style.transform = "translate3d("+this.translateX+"px, 0, 0)";
		}else{
			this.translateX += (e.touches[0].pageX - this.pageX);
			this.slide.style.transform = "translate3d("+this.translateX+"px, 0, 0)";
		}
		this.pageX = e.touches[0].pageX;
	}
	onTouchEnd(e) {
		e.preventDefault();
		e.stopPropagation();
		if( this.translateX > 0 ){
			this.slide.style.transform = "translate3d(0px, 0, 0)";
			this.slide.style.transition = "all linear .3s";
			this.translateX = 0;
		}
		else if ( this.translateX <= -parseInt(this.slide.style.width) + document.body.clientWidth ){
			this.slide.style.transform = "translate3d(-"+(parseInt(this.slide.style.width)-document.body.clientWidth)+"px, 0, 0)";
			this.slide.style.transition = "all linear .3s";
			this.translateX = -(parseInt(this.slide.style.width)-document.body.clientWidth);
		}else{
			if( -this.translateX%document.body.clientWidth >= document.body.clientWidth*0.5 ){
				this.translateX = -document.body.clientWidth*(1+parseInt(this.translateX/document.body.clientWidth));
				this.slide.style.transform = "translate3d("+this.translateX+"px, 0, 0)";
				this.slide.style.transition = "all linear .3s";
			}else{
				this.translateX = document.body.clientWidth*parseInt(this.translateX/document.body.clientWidth);
				this.slide.style.transform = "translate3d(-"+this.translateX+"px, 0, 0)";
				this.slide.style.transition = "all linear .3s";
			}
		}
		var _this = this;
		_this.loop = setInterval(function(){
			if( _this.translateX == -parseInt(_this.slide.style.width) + document.body.clientWidth  ){
				_this.translateX = 0;
				_this.slide.style.transform = "translate3d(0px, 0, 0)";
				_this.slide.style.transition = "all ease-in .3s";
			}
			else{
				_this.translateX -= parseInt(document.body.clientWidth);
				_this.slide.style.transform = "translate3d("+_this.translateX+"px, 0, 0)";
				_this.slide.style.transition = "all ease-in .3s";
			}
		}, 3000);
	}
	render() {
		return(
			<div className="slideWrapper">
        <ul className="slide clearfix" onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
          <li>
            <a target="_blank" href="http://baidu.com">
              <img width="100%" src={sld_1} />
            </a>
          </li>
          <li>
            <a target="_blank" href="http://baidu.com">
              <img width="100%" src={sld_2} />
            </a>
          </li>
        </ul>
      </div>
		);
	}
}

export default Slide;