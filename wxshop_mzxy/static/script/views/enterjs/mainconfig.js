require.config({
	paths:{
		jquery:"../../libs/jquery",
		swiper:"../../plugs/swiper.min",
        commonObj: "../js/commonObj",
        diqu: "../../plugs/diqu2"
	}
});

// swiper依赖jquery，需要引进jquery
require(['jquery','swiper','commonObj','diqu'],function($,swiper,commonObj,diqu){
	var topSlider=new Swiper('#topSlider', {
        slidesPerView: 1, // 一下滑一个
        centeredSlides: true, // 滑动到中间
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: true // 手动滑动时禁止自动滑动
    });
    commonObj.loadCanvas(); // 初次显示在界面上的图片，此方法只会调用一次
    $(window).scroll(commonObj.scrollHandler);
    $("#productul").on("touchmove", commonObj.scrollHandler);

    // 产品详情
    $("#addNums").on('click',commonObj.addNums);
    $("#reduceNums").on('click',commonObj.reduceNums);
    $("#addCart").on('click',commonObj.addCarts);

    // 购物车
    $(".addNum").on('click',commonObj.addNums);
    $(".reduceNum").on('click',commonObj.reduceNums);
    $('.delete').on('click',commonObj.deleteItem);
    commonObj.calculateTotalMoney();

    // 订单详情 (这里的ev依然是javascript里面的那个ev)
    $("input[name='address_options']").on('click',function (ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        if ($(this).attr('id') == "add-naddress") {
            $("#add-address-box").slideDown("fast");
        }else {
            $("#add-address-box").slideUp("fast");
        }
    });

    if ($("select[name='sheng']").length > 0) {
        new PCAS('sheng','shi','qu');
    }

    $("#createFP").on('click',function () {
        if ($(this).attr('checked') == 'checked') {
            $("#create-fa").show();
        }else {
            $("#create-fa").hide();
        }
    })

    // 回填
    $('.shdz-detail').on('click',commonObj.reStoreAddress);



});