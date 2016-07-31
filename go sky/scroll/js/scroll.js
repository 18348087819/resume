/**
 * Created by Administrator on 2016/7/19.
 */

function Responsive(father, url, btn, btnLi, active, btnP, time) {
    this.father = father;
    this.width = this.father.width();
    this.height = this.father.height();
    this.url = url;
    this.btn = btn;
    this.btnLi = btnLi;
    this.active = active;
    this.btnP = btnP;
    this.time = time;
}
Responsive.prototype = {
    make: function () {
        $("<ul class=\"stage\">").css({
            width: this.width,
            height: this.height,
            position: "absolute",
            top: 0,
            left: 0
        }).appendTo(this.father);
        $("<ul class=\"btn\">").css(this.btn).appendTo(this.father);
        for (var i in this.url) {
            $("<li><a title=\"" + this.url[i][0] + "\" href=\"" + this.url[i][1] + "\"><img src=\"" + this.url[i][2] + "\" alt=\"第" + i + "张图片\" \/></a></li>").css({
                width: this.width,
                height: this.height,
                float: "left"
            }).appendTo(this.father.find(".stage"));
            $("<li>").html(i).css(this.btnLi).appendTo(this.father.find(".btn"));
        }
        $("<p class=\"prev\"><</p>").css({
            left: 0
        }).appendTo(this.father);
        $("<p class=\"next\">></p>").css({
            right: 0
        }).appendTo(this.father);
        this.makeCss();
        this.start();
    },
    makeCss: function () {
        this.father.find("img").css({
            display: "block",
            border: "none",
            width: "100%",
            height: "100%"
        });
        this.father.find("p").css(this.btnP);
        this.father.find("p").hover(function () {
            $(this).css({
                opacity: 1
            });
        }, function () {
            $(this).css({
                opacity: .6
            });
        });
    },
    start: function () {
        var _index = 0;
        var _timer = 0;
        var _width = this.father.find(".stage li").width();
        this.father.find(".btn li").first().css(this.active);
        var _firstImg = this.father.find(".stage li").first().clone();
        $(".stage").append(_firstImg).width(this.father.find(".stage li").length * _width);
        var _length = this.father.find(".stage li").length;

        var that = this;

        function remove() {
            that.father.find(".stage").stop().animate({left: -_index * _width}, 500);
            if (_index == _length - 1) {
                that.father.find(".btn li").eq(0).css(that.active).siblings().css(that.btnLi);
            } else {
                that.father.find(".btn li").eq(_index).css(that.active).siblings().css(that.btnLi);
            }
        }

        this.father.find(".btn li").click(function () {
            _index = $(this).index();
            remove();
        });
        this.father.find(".next").click(function () {
            _index++;
            if (_index == _length) {
                _index = 1;
                that.father.find(".stage").css({left: 0});
            }
            remove();
        });
        this.father.find(".prev").click(function () {
            _index--;
            if (_index == -1) {
                _index = _length - 2;
                that.father.find(".stage").css({left: -(_length - 1) * _width});
            }
            remove();
        });
        this.father.hover(function () {
            window.clearTimeout(_timer);
        }, function () {
            _timer = window.setTimeout(scrollInt, that.time);
        });
        function scrollInt() {
            _index++;
            if (_index == _length) {
                _index = 1;
                that.father.find(".stage").css({left: 0});
            }
            remove();
            window.clearTimeout(_timer);
            _timer = window.setTimeout(scrollInt, that.time);
        }

        window.clearTimeout(_timer);
        _timer = window.setTimeout(scrollInt, that.time);
    }

};