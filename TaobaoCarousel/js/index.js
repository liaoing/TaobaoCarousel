//等待HTML文件下载完毕才执行js
window.addEventListener("load", function() {
    var focus = document.querySelector(".focus");
    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focusWidth = focus.offsetWidth;
    //1.当鼠标经过focus显示arrow_l和arrow_r;当鼠标离开focus隐藏arrow_l和arrow_r
    focus.addEventListener("mouseenter", function() {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener("mouseleave", function() {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    //2.动态生成小圆圈  数量等于轮播图图片的数量。
    var ul = focus.querySelector("ul");
    var circle = focus.querySelector(".circle");
    for (var i = 0; i < ul.children.length; i++) {
        //创建图片的个数的li （
        var li = document.createElement("li");
        //给li设置自定义属性(索引号)
        li.setAttribute("index", i);
        //把li添加到circle里面
        circle.appendChild(li);
        li.addEventListener("click", function() {
            //排他思想 干掉所有人用for循环
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = "";
            }
            //留下我自己
            this.className = "current";

            // 3.点击圆圈播放（滚动）对应的图片 距离= - 圆圈的索引号*图片(focus的宽度）的宽度。
            //当点击了某个li,拿到这个Li的索引号
            var index = this.getAttribute("index");
            num = smallCircle = index;
            //调用动画函数
            // animate(obj,target,callback);
            animate(ul, -index * focusWidth);
        });
    }
    circle.children[0].className = "current";
    //→箭头功能，图片无缝滚动
    //深克隆ul里面的第一个孩子即li
    var frist = ul.children[0].cloneNode(true);
    //添加到ul孩子中最后面，因为代码在for循环创建小圆后，不影响小圆圈个数。
    ul.appendChild(frist);
    // 控制小圆圈的变化的变量
    var smallCircle = 0;
    var num = 0;
    var flag = true;
    arrow_r.addEventListener("click", function() {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) { //=circle.children.length
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //小圆点跟随图片变化，排他思想
            smallCircle++;
            //如果点击次数等于小圆圈的个数，此时走到了我们克隆的图片，我们就需要将变量复原。
            if (smallCircle == circle.children.length) {
                smallCircle = 0;
            }
            circleChange();
        }
    });
    //左边箭头功能
    arrow_l.addEventListener("click", function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = circle.children.length;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //小圆点跟随图片变化，排他思想
            smallCircle--;
            if (smallCircle < 0) {
                smallCircle = circle.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        //清除别人
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = "";
        }
        //留下自己
        circle.children[smallCircle].className = "current";
    }
    //鼠标焦点不在图片上，自动播放图片
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})