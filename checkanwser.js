function showMessage(str) {
    alert(str);
}
var startTime = 0;
var endTime = 0;

function start() {
    document.getElementById('A').disabled = false;
    document.getElementById('B').disabled = false;
    document.getElementById('C').disabled = false;
    document.getElementById('D').disabled = false;
    document.getElementById('btnStart').disabled = true;
    timeControll(1);
}

var testTime = 0;
var timeID;

function timeControll(flag) {
    if (flag == 1) {
        timeID = setInterval(function() {
                this.testTime++;
                var day = Math.floor(testTime / (60 * 60 * 24)); //求相差的天数
                var hours = Math.floor(testTime % (60 * 60 * 24) / (60 * 60)); //求相差的小时数
                hours = hours < 10 ? "0" + hours : hours;
                var minutes = Math.floor(testTime % (60 * 60) / 60); //求相差的分钟数
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var seconds = testTime % 60; //求相差的秒数
                seconds = seconds < 10 ? "0" + seconds : seconds;
                document.getElementById('textTime').value = hours + ":" + minutes + ":" + seconds;
            }, 1000) //每秒获取一次当前时间，并与time1求差值，最后计算出分钟和秒，显示在考试用时文本框        
    } else {
        clearInterval(timeID);
    }
}

//上一题下一题按钮
function selectedIndexChange(symbol) {
    var question = document.getElementById("questionNO");
    var index = question.selectedIndex;
    if (symbol == '+') {
        index++;
        if (index < document.getElementById("questionNO").length) {
            question.options[index].selected = true;
            setTimeout(() => optionsUnchecked(), 1000) //延时一秒取消radio button的被选中状态
        } else {
            alert('已经是最后一题了！');
        }
    } else {
        index--;
        if (index < 0) {
            alert('已经是第一题了！');
        } else {
            question.options[index].selected = true;
        }
    }
}
//让选项按钮取消被选中
function optionsUnchecked() {
    document.getElementById("A").checked = false;
    document.getElementById("B").checked = false;
    document.getElementById("C").checked = false;
    document.getElementById("D").checked = false;
}

function timePause() {
    if (document.getElementById("btnPause").innerHTML == '暂停考试') {
        timeControll(0);
        document.getElementById("btnPause").innerHTML = '继续考试';
    } else {
        timeControll(1);
        document.getElementById("btnPause").innerHTML = '暂停考试';
    }

}


// 获取时间：
// 1.时间对象.getFullYear（）获取到时间对象中的年份信息
// 2,时间对象.getMonth（）获取到时间对象中的月份信息
// 3.时间对象.getDate（）获取到时间对象中的日期信息
// 4.时间对象.getHours（）获取到时间对像中的小时信息
// 5.时间对象.getMinutes（）获取到时间对象中的分钟信息
// 6.时间对象.getSeconds（）获取到时间对象中的秒钟信息
// 7.时间对象.getDay（）获取到时间对象中的星期信息
// 8.时间对象.getTime（）获取到时间对象中的时间戳信息
// 设置时间：
// 1.时间对象.setFullYear（数字）设置时间对象中的年份信息
// 2,时间对象.setMonth（数字）设置时间对象中的月份信息
// 3.时间对象.setDate（数字）设置时间对象中的日期信息
// 4.时间对象.setHours（数字）设置时间对象中的小时信息
// 5.时间对象.setMinutes（数字）设置时间对象中的分钟信息
// 6.时间对象.setSeconds（数字）设置时间对象中的秒钟信息
// 7.时间对象.setTime（数字）设置时间对象中的时间戳信息

// //获得Date总的毫秒数（时间戳）,不是当前时间的毫秒数,而是距离1970年1月1号过了多少毫秒数
// //1.通过valueOf（）getTime（）
// var date new Date（）;
// console.log(date.valueof（）);
// //就是我们现在时间距离1970.1.1总的毫秒数
// console.log(date.getTime（）);
// //2.简单的写法（最常用的写法）
// var date1 + new Date（）; //+new Date（）返回的就是总的毫秒数
// console.log(date1);
// //3.H5新增的获得总的毫秒数
// console.log(Date.now（）);