// 封装dom的查询方法
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// 获取变量

var changeImg = $('.changeImg'), // 获取切换图片元素
    imgBox = $('.imgBox'), // 获取图片容器
    imgBlock = $('.imgBlock'), // 获取拖拽图片
    imgGap = $('.imgGap'), // 获取缺口图片
    slider = $('.slider'), // 获取滑动条
    title = $('h3'), // 获取标题
    span = $('span'), // 获取滑动条的文字
    btn = $('button'); // 获取按钮



// 生成一个随机数函数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 创建图片资源
var imgArr = ["t1.png", "t2.png", "t3.png", "t4.png", "t5.png", ];

// 初始化页面

function initPage() {
    var random = getRandom(0, imgArr.length);
    // 初始化背景图片和拖拽图片
    imgBox.style.background = 'url(../img/' + imgArr[random] + ')';
    imgBlock.style.background = 'url(../img/' + imgArr[random] + ')';

    // 设置文字标题
    title.style.color = 'black';
    title.innerHTML = '请完成图片验证';

    // 设置缺口图片和拖拽图片的定位
    var maxHeight = imgBox.offsetHeight - imgGap.offsetHeight;
    var minWidth = imgBox.offsetWidth / 2 - imgGap.offsetWidth;

    var left = getRandom(minWidth, minWidth + imgBox.offsetWidth / 2);
    var top = getRandom(0, maxHeight);

    imgGap.style.left = left + "px";
    imgGap.style.top = 0 + "px";

    imgBlock.style.backgroundPositionX = -left + "px";
    imgBlock.style.backgroundPositionY = -top + "px";

    btn.onmousedown = function(e) {
        imgBlock.style.opacity = 1;

        // 设置文字标题
        title.style.color = 'black';
        title.innerHTML = '拖动图片完成验证';

        // 设置滑动条的隐藏
        span.style.opacity = 0;

        // 给滑动的按钮和拖拽图片设置滑动的效果为none
        imgBlock.style.transition = 'none';
        btn.style.transition = 'none';

        slider.onmousemove = function(ev) {
            var newLeft = ev.clientX - slider.offsetLeft - e.offsetX;
            console.log(ev);
            if (newLeft < -2) {
                newLeft = -2;
            } else if (newLeft > imgBox.offsetWidth - imgGap.offsetWidth) {
                newLeft = imgBox.offsetWidth - imgGap.offsetWidth;
            }
            imgBlock.style.left = newLeft + "px";
            btn.style.left = newLeft + "px";
        }
        window.onmouseup = function() {
            var differLeft = imgGap.offsetLeft - imgBlock.offsetLeft;
            if (differLeft < 5 && differLeft > -5) {
                // 说明验证成功
                // 让拖拽图片和缺口图片消失
                imgBlock.style.opacity = 0;
                imgGap.style.opacity = 0;

                // 设置文字标题
                title.style.color = 'red';
                title.innerHTML = '验证成功';

                // 删除所有事件
                slider.onmousemove = window.onmouseup = btn.onmousedown = null;
            } else {
                // 说明验证失败
                imgBlock.style.left = 0 + "px";
                btn.style.left = 0 + "px";
                imgBlock.style.transition = 'all .5s';
                btn.style.transition = 'all .5s';

                // 设置滑动条的文本显示
                span.style.opacity = 1;

                // 设置文字标题
                title.style.color = 'green';
                title.innerHTML = '验证失败';

                slider.onmousemove = window.onmouseup = null;
            }
        }
    }
}

initPage();


changeImg.onclick = initPage;