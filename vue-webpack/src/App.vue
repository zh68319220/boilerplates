<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate: () => {
    //通过手机屏幕dpr和手机宽度来确定font-size的值
    function autorun() {
      //初始值
      var default_width = 20
      var default_dpr = 1
      var dpr = window.devicePixelRatio
      var width = screen.width
      var html_style = ''
      var body_style = ''

      //dpr倍数
      var difference = dpr / default_dpr

      //计算
      if (difference === 1 || difference === 2 || difference === 3) {
        var default_min_size = 20 * difference
        var default_max_size = 33.75 * difference
        var default_coefficient = 0.0625 * difference
        html_style = get_font_size(width, default_min_size, default_max_size, default_coefficient)
        body_style = 'font-size:' + difference * 12 + 'px'
      } else {
        html_style = get_font_size(width, 20, 33.75, 0.0625)
        body_style = 'font-size:12px'
      }

      //进行dom操作
      $("html").attr('style', html_style);
      $("body").attr('style', body_style);
    }

    /**

    * 通过手机屏幕dpr和手机宽度来确定font-size的值

    * @param {int} width

    * @param {int} default_min_size

    * @param {int} default_max_size

    * @param {int} default_coefficient

    * @returns {String}

    */
    function get_font_size(width, default_min_size, default_max_size, default_coefficient) {
      var style = '';
      //屏幕宽度需要在320-540之间进行计算
      if (width < 320) {
        style = 'font-size:' + default_min_size + 'px'
      } else if (width > 540) {
        style = 'font-size:' + default_max_size + 'px'
      } else {
        var difference = width - 320;
        var fontsize = default_min_size + difference * default_coefficient
        style = 'font-size:' + fontsize + 'px'
      }
      return style;
    }
  }
}
</script>

<style>
*{ margin: 0;padding: 0; }

html, body{
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
