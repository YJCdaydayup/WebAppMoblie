/**
 * Created by yangli on 2018/9/2.
 */
// 常用的函数

// 这里编写模块，不依赖任何模块时参数可以只是require
// 返回一个对象 就是当前模块对象
define(function () {
    // 这里就返回字面量对象，下面调用的时候，直接使用commonObj即可，以防出现this错误
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
        },

        // 添加数量
        addNums: function () {
            var currentNum = parseInt($(this).prev().val());
            if (!isNaN(currentNum)) {
                currentNum ++;
            }else {
                currentNum = 1;
            }
            $(this).prev().val(currentNum);
            commonObj.reCalculateXiaoji(this);
        },

        // 减少数量
        reduceNums: function () {
            var currentNum = parseInt($(this).next().val());
            if (!isNaN(currentNum)) {
                currentNum --;
                if (currentNum <= 1) {
                    currentNum = 1;
                }
            }else {
                currentNum = 1;
            }
            $(this).next().val(currentNum);
            commonObj.reCalculateXiaoji(this);
        },

        addCarts: function (e) {
            // 阻止冒泡
            e.stopPropagation();
            // 获取购物车数量
            var car = $("#shoppingCar");
            var carCurNum = Number(car.text());
            // 获取输入框数量
            var inputNum = Number($("#productNums").val());
            // 获取产品坐标(相对于document)
            var x = $("#productId").offset().left - 10;
            var y = $("#productId").offset().top - 10;
            // 获取导航购物车按钮的位置
            var X = $("#n_1").offset().left;
            var Y = $("#n_1").offset().top;
            // 获取图片的src
            var imgSrc = $("#productId").children('img').attr('src');
            var flyObj = $("#obj");
            if (flyObj.length <= 0) {
                var img = $("<img/>",{
                    width: "50px",
                    height: "50px",
                    src: imgSrc
                });
                var div = $("<div/>",{
                     id: "obj"
                }).append(img);
                $("body").append(div);
            }
            var obj=$('#obj');
            if (!obj.is(":animated")) {
                obj.css({
                    left: x,
                    top:y
                }).animate({
                    left: X,
                    top: Y
                },function () {
                    obj.stop(false,false).animate({
                        top: Y-20,
                        opacity: 0
                    },500,function () {
                        obj.fadeOut('fast',function () {
                            obj.remove();
                            // // 修改购物车数量
                            car.text(carCurNum + inputNum);
                            commonObj.changeCarSize(car);
                            if (Number(car.text()) < 1) {
                                car.hide();
                            }
                        });
                    })
                });
            }
        },
        changeCarSize: function (car) {
            var text = car.text();
            if (text > 99) {
                car.css({
                    width: "3rem"
                });
            }else {
                car.css("width","2rem");
            }
        },
        deleteItem: function () {
            $(this).parents('.shoppingBox').remove();
            commonObj.calculateTotalMoney();
        },
        // 计算小记
        reCalculateXiaoji: function (ev) {
            var $this = $(ev);
            if ($this.parents('.shoppingBox').length > 0) {
                var num = $(ev).siblings('.productNum').val(),
                    sum = Number(num) * 766;
                $(ev).parents('.shoppingBox').find('.sum-money').text("¥" + sum);
            }
            commonObj.calculateTotalMoney();
        },
        calculateTotalMoney: function () {
           var $rel = $('.sum-money').map(function () {
                return Number($(this).text().split('¥')[1]);
            }).get();
            var sum = 0;
            $.each($rel,function (index,value) {
                sum += value;
            })
            $("#totle-money").text("¥" + sum);
            if (sum == 0) {
                $("#rabbit").show();
                $("#car-footer").hide();
            }else {
                $("#rabbit").hide();
                $("#car-footer").show();
            }
        }
    }});