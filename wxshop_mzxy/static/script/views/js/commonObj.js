/**
 * Created by yangli on 2018/9/2.
 */
// 常用的函数

// 这里编写模块，不依赖任何模块时参数可以只是require
// 返回一个对象 就是当前模块对象
define(function () {
    return commonObj = {
        ajaxstatus: true,
        pagesize: 5,
        currentPage: 0,
        loadCanvas: function () {
            var imgLength = $("#productul").find('canvas').length;
            if (imgLength > 0) {
                $('#productul').find('canvas').each(function () {
                    // 理清jquery对象和js对象的关联之处
                    // jquery标签对象的第一个元素就是对应的那个标签
                   var imgSrc = $(this).attr("data-src");
                    // 取出canvas对象
                    var canvas = $(this)[0];
                    // 新建图片标签
                    var imageObj = new Image();
                    // 创建画布
                    var cvs = canvas.getContext('2d');
                    if (cvs) {
                        imageObj.src = imgSrc;
                        imageObj.onload = function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            cvs.drawImage(this,0,0);
                            $(canvas).css({
                                "background-image": 'none'
                            });
                        }
                    }
                });
            }
        },
        getData: function (pagenumber) {
            $.ajax({
                type: 'get',
                url: "http://localhost/wxshop_mzxy/static/script/test.json",
                data: {
                    page: pagenumber,
                    row: commonObj.pagesize // 也可以使用this
                },
                dataType: 'json',
                success: function (result) {
                    // 隐藏加载框
                    if (result.length > 0) {
                        alert(result);
                    }                },
                beforeSend: function () {
                    // $(.loaddiv) 展示加载框
                },
                error: function () {
                    // 隐藏加载框
                    // alert('failed'); 假设成功了
                    commonObj.insertData();
                }
            });
        },
        insertData: function () {
            var ul = $('#productul ul');
            var data = [1,2,3,4,5];
            var html = "";
            for (var i=0;i<data.length;i++) {
                html += '<li><a href="#"><div class="triangle-topleft"></div><span class="shuxing" data_url="productinfo.html">专属</span>' + '<div class="leftimage">' + '<canvas data-src="images/product/product1.png"></canvas>' + '</div>' + '<div class="productcontent">'+ '<p class="ptitle pl10">广联达变更算量</p><p class="pdes pl10">这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介</p><p class="pprice pl10">价格: <span class="green">$5000</span></p></div></a> </li>';
            }
            commonObj.ajaxstatus = true;
            ul.append(html);
            this.loadCanvas();// 这个方法一定要调用，加载出图片的
        },
        scrollHandler: function () {
            var pageH = $(document).height();
            var scrollT = $(window).scrollTop();
            var winHeight = $(window).height();
            if (parseInt(scrollT) + parseInt(winHeight) + 50 > parseInt(pageH) && commonObj.ajaxstatus) {
                commonObj.ajaxstatus = false;
                commonObj.currentPage ++;
                commonObj.insertData();
            }
        }
    }});