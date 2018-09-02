/**
 * Created by yangli on 2018/9/2.
 */
// 常用的函数

// 这里编写模块，不依赖任何模块时参数可以只是require
define(function (require) {
    return {
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
        }

    }});