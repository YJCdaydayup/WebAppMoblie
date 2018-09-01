/**
 * Created by yangli on 2018/9/1.
 */
require.config({
   paths: {
       jquery: "../../libs/jquery",
       swiper: "../../libs/swiper.min"
   }
});

require(['jquery','swiper'],function () {
   var topSlider = new Swiper('#topSlider',{
       slidesPerView:1,
       centeredSlides: true
   });

});