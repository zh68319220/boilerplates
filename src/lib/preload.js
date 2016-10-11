/*
  preload and preload the preload scene source
*/
"use strict";
!
function(e, o) {
	"function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o() : e.resLoader = o(e)
}(this, function() {
	function e(e) {
		this.presources = e.presources || [], this.resources = e.resources || [], this.onProgress = e.onProgress, this.onComplete = e.onComplete, this.precur = 0, this.cur = 0, this.errors = 0, this.total = this.resources.length, this.loading = document.querySelector(".loading")
	}
	function o(e) {
		return "[object Function]" == Object.prototype.toString.call(e)
	}
	return e.prototype.start = function() {
		var e = this;
		e.presources && e.presources.length > 0 ? Array.prototype.forEach.call(e.presources, function(o) {
			o.indexOf("http://") || o.indexOf("https://") || (o += baseUrl);
			var r = new Image;
			r.onload = function() {
				e.preloaded(++e.precur, e.presources.length)
			}, r.src = o, r.onerror = function() {
				e.preloaded(++e.precur, e.presources.length), r.onerror = null
			}
		}) : (this.resources.length > 0 && (this.loading.style.display = "block"), e.startLoad())
	}, e.prototype.startLoad = function() {
		var e = this,
			o = "../";
		e.resources && e.resources.length > 0 ? Array.prototype.forEach.call(e.resources, function(r) {
			r.indexOf("http://") || r.indexOf("https://") || (r += o);
			var t = new Image;
			t.onload = function() {
				e.loaded(++e.cur, e.total)
			}, t.src = r, t.onerror = function() {
				e.errors++, e.loaded(++e.cur, e.total), t.onerror = null
			}
		}) : this.loaded(0, 0)
	}, e.prototype.preloaded = function(e, o) {
		e == o && (this.loading.style.display = "block", this.startLoad())
	}, e.prototype.loaded = function(e, r) {
		o(this.onProgress) && o(this.onComplete) && (e == r ? this.onComplete(r) : this.onProgress(e, r))
	}, e
});
