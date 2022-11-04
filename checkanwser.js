var yourAnswer = new Array;

function start() {
    if (document.getElementById("testPaper").selectedIndex == 0) {
        alert('请先选择试题！'); //如果未选择试题，弹出提示       
    } else {
        radiobtnEnable(1);
        document.getElementById('btnStart').disabled = true; //禁用开始按钮
        document.getElementById('btnPause').disabled = false; //启用暂停按钮
        document.getElementById("btnFinish").disabled = false; //启用结束考试按钮        
        timeControll(1);
    }
}

var testTime = 0;
var timeID;
//考试时间记录
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
            selectChange();
            // setTimeout(() => optionsUnchecked(), 500) //延时0.5秒取消radio button的被选中状态
        } else {
            alert('已经是最后一题了！');
        }
    } else {
        index--;
        if (index < 0) {
            alert('已经是第一题了！');
        } else {
            question.options[index].selected = true;
            selectChange();
        }
    }
}

function selectChange() {
    var question = document.getElementById("questionNO");
    var index = question.selectedIndex;
    if (yourAnswer[index] != undefined) {
        optionsChecked(yourAnswer[index]);
        // console.log(yourAnswer[index]);
    } else {
        optionsUnchecked();
    }

}

//让选项按钮取消被选中
function optionsUnchecked() {
    document.getElementById("A").checked = false;
    document.getElementById("B").checked = false;
    document.getElementById("C").checked = false;
    document.getElementById("D").checked = false;
}
//让选项按钮被选中
function optionsChecked(checkedFlag) {
    // alert(checkedFlag);
    switch (checkedFlag) {
        case "A":
            document.getElementById("A").checked = true;
            break;
        case "B":
            document.getElementById("B").checked = true;
            break;
        case "C":
            document.getElementById("C").checked = true;
            break;
        case "D":
            document.getElementById("D").checked = true;
            break;
        case "未作答":
            optionsUnchecked();
            break;
        case "undefined":
            optionsUnchecked();
            break;
    }
}

//radio button按钮禁用和启用
function radiobtnEnable(enabletag) {
    if (enabletag == 1) {
        document.getElementById('A').disabled = false;
        document.getElementById('B').disabled = false;
        document.getElementById('C').disabled = false;
        document.getElementById('D').disabled = false;
    } else {
        document.getElementById('A').disabled = true;
        document.getElementById('B').disabled = true;
        document.getElementById('C').disabled = true;
        document.getElementById('D').disabled = true;
    }
}
//暂停按钮
function timePause() {
    if (document.getElementById("btnPause").innerHTML == '暂停考试') {
        timeControll(0);
        radiobtnEnable(0);
        document.getElementById("btnPause").innerHTML = '继续考试';
    } else {
        timeControll(1);
        radiobtnEnable(1);
        document.getElementById("btnPause").innerHTML = '暂停考试';
    }
}
//ABCD单选按钮
function radioBtn(option) {
    var index = document.getElementById("questionNO").selectedIndex;
    yourAnswer[index] = option;
    refresh();
    if (document.getElementById("autoNext").checked == true) {
        setTimeout(() => selectedIndexChange('+'), 400) //点击ABCD单选按钮后，先延时0.4s，再自动跳转到下一题；
    }

}
//刷新答题记录文本框
function refresh() {
    var txtLogValue = '';
    for (i = 0; i < yourAnswer.length; i++) {
        if (yourAnswer[i] == undefined) {
            yourAnswer[i] = '未作答';
        }
    }
    for (i = 0; i < yourAnswer.length; i++) {
        txtLogValue = txtLogValue + "第" + (i + 1) + "题:" + yourAnswer[i] + "\n";
    }
    document.getElementById("txtLog").value = txtLogValue;
}

//结束答题
function Finish() {
    if (yourAnswer.length < Standard_Answer1.length || yourAnswer.includes("未作答")) {
        if (confirm("答题尚未完成，是否提交？") == true) {
            for (i = 0; i < Standard_Answer1.length; i++) {
                if (yourAnswer[i] == undefined) {
                    yourAnswer[i] = '未作答';
                }
            }
            timeControll(0);
            answerCheck(arry_Standard_Anwser[document.getElementById("testPaper").selectedIndex - 1]);
            document.getElementById("btnSave").disabled = false; //启用保存考试结果按钮
            document.getElementById("btnStart").disabled = false; //启用开始考试结果按钮
        } else {
            var unAnswerNO = "";
            for (i = 0; i < Standard_Answer1.length; i++) {
                if ((yourAnswer[i] == undefined) || (yourAnswer[i] == "未作答")) {
                    yourAnswer[i] = '未作答';
                    unAnswerNO = unAnswerNO + "第" + i + "题，未作答；" + "\n";
                }
            }
            document.getElementById("txtResult").value = unAnswerNO;
            alert("以下题目未作答(详见“考试信息”文本框)，点击确定继续答题。" + "\n" + unAnswerNO);
        }
    } else {
        if (confirm("答题已完成，是否确认提交？") == true) {
            answerCheck(arry_Standard_Anwser[document.getElementById("testPaper").selectedIndex - 1]);
            document.getElementById("btnSave").disabled = false; //启用保存考试结果按钮
            timeControll(0); //停止计时
        }
    }
}


var Standard_Answer1 = ['C', 'A', 'C', 'B', 'D', 'A', 'A', 'A', 'A', 'C', 'A', 'D', 'D', 'C', 'B', 'C', 'C', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'B', 'D', 'A', 'A', 'B', 'C', 'A', 'A', 'B', 'B', 'C', 'B', 'C', 'A', 'D', 'A', 'C', 'B', 'D', 'A', 'C', 'B', 'B', 'D', 'C', 'D', 'A', 'D', 'B', 'B', 'C', 'D', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'C', 'D', 'C', 'D', 'A', 'C', 'B', 'A', 'D', 'C', 'A', 'D'];

var Standard_Answer2 = ['B', 'C', 'D', 'B', 'B', 'D', 'B', 'D', 'B', 'D', 'C', 'D', 'B', 'B', 'D', 'B', 'D', 'D', 'C', 'A', 'A', 'D', 'C', 'A', 'D', 'B', 'A', 'B', 'A', 'B', 'C', 'C', 'A', 'D', 'B', 'C', 'D', 'A', 'B', 'B', 'D', 'B', 'A', 'C', 'C', 'D', 'C', 'A', 'B', 'C', 'D', 'A', 'A', 'B', 'D', 'D', 'B', 'A', 'C', 'C', 'D', 'B', 'D', 'C', 'B', 'A', 'C', 'C', 'B', 'C', 'C', 'B', 'D', 'A', 'A'];

var Standard_Answer3 = ['B', 'D', 'C', 'D', 'A', 'B', 'C', 'B', 'B', 'B', 'D', 'B', 'B', 'C', 'D', 'C', 'B', 'A', 'D', 'B', 'B', 'D', 'B', 'A', 'C', 'D', 'B', 'A', 'A', 'B', 'D', 'C', 'C', 'D', 'D', 'B', 'C', 'A', 'D', 'D', 'C', 'A', 'B', 'C', 'A', 'B', 'D', 'A', 'D', 'C', 'B', 'D', 'C', 'A', 'B', 'D', 'A', 'B', 'A', 'B', 'D', 'A', 'B', 'B', 'B', 'B', 'A', 'C', 'D', 'A', 'A', 'A', 'C', 'B', 'D'];
var Standard_Answer4 = ['D', 'A', 'C', 'B', 'B', 'C', 'A', 'B', 'C', 'D', 'C', 'C', 'D', 'C', 'A', 'B', 'C', 'D', 'D', 'A', 'D', 'B', 'A', 'D', 'B', 'B', 'D', 'A', 'C', 'C', 'A', 'B', 'B', 'B', 'B', 'C', 'B', 'C', 'A', 'C', 'D', 'A', 'D', 'B', 'C', 'A', 'B', 'C', 'C', 'D', 'C', 'A', 'C', 'A', 'A', 'D', 'D', 'A', 'D', 'B', 'C', 'D', 'B', 'B', 'A', 'A', 'C', 'B', 'D', 'C', 'A', 'C', 'B', 'B', 'D'];
var Standard_Answer5 = ['C', 'D', 'B', 'B', 'C', 'B', 'B', 'B', 'C', 'B', 'C', 'C', 'B', 'D', 'A', 'B', 'C', 'C', 'A', 'B', 'C', 'A', 'C', 'D', 'D', 'C', 'D', 'B', 'A', 'D', 'A', 'D', 'A', 'D', 'B', 'A', 'D', 'B', 'B', 'B', 'C', 'A', 'B', 'C', 'D', 'A', 'B', 'B', 'A', 'A', 'A', 'D', 'B', 'C', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'C', 'A', 'D', 'A', 'B', 'B', 'D', 'D', 'C', 'A', 'A', 'B', 'D'];
var Standard_Answer6 = ['D', 'A', 'B', 'D', 'D', 'B', 'B', 'C', 'A', 'B', 'C', 'C', 'A', 'B', 'D', 'A', 'C', 'D', 'B', 'A', 'A', 'D', 'C', 'D', 'B', 'C', 'B', 'C', 'B', 'B', 'D', 'A', 'C', 'C', 'C', 'C', 'B', 'A', 'A', 'B', 'A', 'D', 'B', 'D', 'C', 'A', 'D', 'A', 'D', 'A', 'A', 'B', 'B', 'A', 'A', 'D', 'D', 'B', 'D', 'B', 'C', 'D', 'A', 'B', 'D', 'B', 'D', 'B', 'A', 'C', 'B', 'B', 'A', 'D', 'B'];
var Standard_Answer7 = ['A', 'A', 'D', 'A', 'D', 'D', 'A', 'C', 'D', 'B', 'C', 'D', 'B', 'C', 'D', 'D', 'B', 'B', 'A', 'C', 'C', 'D', 'D', 'C', 'B', 'B', 'A', 'D', 'C', 'A', 'C', 'B', 'C', 'A', 'C', 'B', 'A', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'B', 'A', 'A', 'D', 'D', 'A', 'B', 'C', 'A', 'B', 'A', 'A', 'C', 'D', 'B', 'A', 'C', 'A', 'B', 'D', 'C', 'B', 'D', 'A', 'C', 'C', 'D', 'C', 'A', 'B', 'C'];
var Standard_Answer8 = ['C', 'A', 'B', 'D', 'C', 'D', 'C', 'D', 'C', 'D', 'C', 'A', 'C', 'B', 'A', 'D', 'B', 'C', 'B', 'B', 'A', 'B', 'C', 'A', 'C', 'A', 'B', 'C', 'D', 'B', 'C', 'A', 'A', 'C', 'B', 'A', 'B', 'A', 'C', 'D', 'D', 'B', 'C', 'A', 'A', 'B', 'A', 'B', 'C', 'C', 'D', 'B', 'D', 'A', 'C', 'B', 'D', 'A', 'C', 'B', 'A', 'C', 'C', 'D', 'D', 'A', 'C', 'B', 'D', 'D', 'A', 'B', 'D', 'D', 'A'];
var Standard_Answer9 = ['B', 'B', 'D', 'D', 'D', 'B', 'D', 'D', 'A', 'A', 'D', 'B', 'D', 'A', 'A', 'A', 'B', 'C', 'D', 'B', 'C', 'A', 'D', 'C', 'B', 'A', 'D', 'C', 'D', 'B', 'A', 'D', 'B', 'C', 'A', 'C', 'D', 'A', 'D', 'A', 'A', 'D', 'B', 'B', 'C', 'D', 'A', 'A', 'B', 'D', 'C', 'D', 'C', 'D', 'D', 'C', 'D', 'A', 'A', 'B', 'A', 'A', 'B', 'D', 'C', 'D', 'C', 'A', 'B', 'B', 'A', 'C', 'D', 'B', 'D'];
var Standard_Answer10 = ['C', 'C', 'D', 'A', 'C', 'B', 'D', 'D', 'C', 'C', 'A', 'A', 'A', 'D', 'B', 'A', 'D', 'A', 'D', 'B', 'A', 'B', 'B', 'C', 'A', 'B', 'A', 'A', 'D', 'A', 'C', 'A', 'A', 'B', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'B', 'D', 'A', 'B', 'A', 'C', 'D', 'B', 'A', 'C', 'C', 'B', 'A', 'D', 'B', 'C', 'C', 'B', 'A', 'B', 'D', 'A', 'A', 'C', 'A', 'A', 'C', 'D', 'A', 'A', 'C', 'B', 'C', 'D'];
var Standard_Answer11 = ['B', 'C', 'A', 'C', 'B', 'B', 'D', 'A', 'C', 'D', 'B', 'B', 'A', 'C', 'C', 'C', 'A', 'B', 'D', 'B', 'B', 'B', 'A', 'C', 'D', 'A', 'C', 'C', 'D', 'D', 'A', 'D', 'A', 'D', 'D', 'B', 'D', 'A', 'B', 'C', 'C', 'D', 'A', 'D', 'B', 'C', 'C', 'D', 'B', 'D', 'B', 'A', 'C', 'C', 'B', 'B', 'C', 'D', 'A', 'A', 'B', 'D', 'B', 'C', 'B', 'A', 'C', 'B', 'D', 'C', 'C', 'D', 'A', 'A', 'B'];
var Standard_Answer12 = ['C', 'A', 'A', 'D', 'A', 'B', 'B', 'C', 'A', 'B', 'C', 'B', 'B', 'B', 'B', 'A', 'D', 'C', 'A', 'C', 'B', 'D', 'B', 'B', 'C', 'A', 'B', 'C', 'C', 'C', 'A', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'C', 'B', 'C', 'C', 'D', 'D', 'C', 'C', 'C', 'B', 'C', 'C', 'D', 'A', 'D', 'A', 'C', 'A', 'A', 'C', 'B', 'D', 'B', 'A', 'D', 'B', 'C', 'A', 'B', 'B', 'C', 'D', 'C', 'B', 'A', 'C', 'B'];

var arry_Standard_Anwser = [Standard_Answer1, Standard_Answer2, Standard_Answer3, Standard_Answer4, Standard_Answer5, Standard_Answer6, Standard_Answer7, Standard_Answer8, Standard_Answer9, Standard_Answer10, Standard_Answer11, Standard_Answer12];

//核对答案
function answerCheck(arry_Standard_Anwser) {
    var Error_Sum = 0; //错题的个数
    var Error_Listening = 0; //听力题错误数量
    var Error_Vocabulary = 0; //词汇题错误数量
    var Error_ClozeTest = 0; //完形填空错误数量
    var Error_Reading = 0; //阅读题错误数量
    var txtResult = "";
    for (i = 0; i < Standard_Answer1.length; i++) {
        if (yourAnswer[i] != arry_Standard_Anwser[i]) {
            Error_Sum++;
            if (i < 15) {
                Error_Listening++;
            } else if (i >= 15 && i < 35) {
                Error_Vocabulary++;
            } else if (i >= 35 && i < 55) {
                Error_ClozeTest++;
            } else if (i >= 55 && i < 75) {
                Error_Reading++;
            }
            var wrongMessage = (yourAnswer[i] == "未作答") ? ("题：您未作答") : ("题：您的答案为" + yourAnswer[i]);
            txtResult = txtResult + ("第" + (i + 1) + wrongMessage + "，而参考答案为" + arry_Standard_Anwser[i] + "(×)" + "\r\n");
        } else {
            txtResult = txtResult + ("第" + (i + 1) + "题：您的答案为" + yourAnswer[i] + "，参考答案为" + arry_Standard_Anwser[i] + "(√)" + "\r\n");
        }
    }
    var Score_Lose = Error_Listening + Error_ClozeTest + Error_Reading * 2 + Error_Vocabulary * 1.5;
    document.getElementById("txtResult").value = txtResult + ("考试结果详情：" + "\r\n" + "您此次考试用时" + Math.floor(testTime / 60) + "分" + testTime % 60 + "秒，" + "总共错了" + Error_Sum + "题。" + "\r\n" + "其中听力错了" + Error_Listening + "题，词汇题错了" + Error_Vocabulary + "题，" + "\r\n" + "完型填空错了" + Error_ClozeTest + "题，阅读错了" + Error_Reading + "题。" + "\r\n" + "累计扣分" + Score_Lose + "分，总得分为" + (105 - Score_Lose) + "分，得分率为" + Math.round((105 - Score_Lose) * 100 / 105, 2) + "%。");
}

function save() {
    var savedate = new Date();
    var months = (savedate.getMonth() + 1) < 10 ? "0" + (savedate.getMonth() + 1) : (savedate.getMonth() + 1);
    var dates = savedate.getDate() < 10 ? "0" + savedate.getDate() : savedate.getDate();
    var hours = savedate.getHours() < 10 ? "0" + savedate.getHours() : savedate.getHours();
    var minutes = savedate.getMinutes() < 10 ? "0" + savedate.getMinutes() : savedate.getMinutes();
    var seconds = savedate.getSeconds() < 10 ? "0" + savedate.getSeconds() : savedate.getSeconds();

    var filename = "考试结果" + savedate.getFullYear() + months + dates + hours + minutes + seconds;
    var obj = document.getElementById("testPaper");
    var index = obj.selectedIndex;

    var text = "您在" + savedate.getFullYear() + "年" + months + "月" + dates + "日" + hours + ":" + minutes + ":" + seconds + "完成了《" + obj.options[index].text + "》的测试，测试结果如下：" + "\n" + document.getElementById("txtResult").value;
    download(filename, text);
}



function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

window.onbeforeunload = function(event) {
    event.returnValue = "我在这写点东西...";
};

