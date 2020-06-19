function animate(obj, target, callback) { //回调函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //计算步长：（目标位置-现在位置）/10 写在定时器里面
        //js中尽量避免浮点数的运算。取整此处正数往上取整，负数往小取整。
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //记得赋值
        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //定时器结束执行回调函数
            // if (callback) {
            //     //调用函数
            //     callback();
            // }
            //更高级写法  短路操作有传入callback参数和有回调函数时才执行。
            callback && callback();
        }
    }, 15);
}