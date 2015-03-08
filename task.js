$(loaded);




function loaded() {
  showText();
  readnum();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      taskText();
	  dateText();
	  titleText();
      showText();
    });
	
}

$("#resetButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      resetText();
  showText();
      
    });
 
function resetText() {

 localStorage.clear();
alert("リセット");

}


// 入力された内容をローカルストレージに保存する

//詳細部分のテキストを保存する
function taskText() {
  // 時刻をキーにして入力されたテキストを保存する
var list = $("#list")
  list.children().remove();

 var key, value, html = [];

 var tasktext = $("#formTexttask");
 
  var time = new Date();
  var mydate=time.getDate();
  var mymonth=time.getMonth()+1;
    var myyear=time.getFullYear();
  var val = escapeText(tasktext.val());
  value = sessionStorage.getItem("tasknum");
	

value =parseInt(value,10);



 key = localStorage.key(value);
  
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  
  if(checkText(val)) {
  todo[0].checklist[0].task=val;
  }
  
  var str=JSON.stringify(todo);
  localStorage.setItem(todo[0].checklist[0].saveid,str);

  // テキストボックスを空にする
  tasktext.val("");

}
//日付のテキストを保存する
function dateText() {
  // 時刻をキーにして入力されたテキストを保存する
var list = $("#list")
  list.children().remove();

 var key, value, html = [];


 var datetext = $("#formTextdate");
  var time = new Date();
  var mydate=time.getDate();
  var mymonth=time.getMonth()+1;
    var myyear=time.getFullYear();

  var val = escapeText(datetext.val());
 
  // テキストボックスを空にする
 
 
  value = sessionStorage.getItem("tasknum");
	

value =parseInt(value,10);



 key = localStorage.key(value);
  
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  if(checkText(val)) {
  
  todo[0].checklist[0].kigen=val;
  }
  
  var str=JSON.stringify(todo);
  localStorage.setItem(todo[0].checklist[0].saveid,str);

  
  
  // テキストボックスを空にする
  datetext.val("");

}
//タイトルのテキストを保存する
function titleText() {
  // 時刻をキーにして入力されたテキストを保存する
var list = $("#list")
  list.children().remove();

 var key, value, html = [];


 var titletext = $("#formTexttitle");
  var time = new Date();
  var mydate=time.getDate();
  var mymonth=time.getMonth()+1;
    var myyear=time.getFullYear();

  var val = escapeText(titletext.val());
 
  // テキストボックスを空にする
 
 
  value = sessionStorage.getItem("tasknum");
	

value =parseInt(value,10);



 key = localStorage.key(value);
  
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  
  if(checkText(val)) {
  
  todo[0].dotime=val;
 
  }
  var str=JSON.stringify(todo);
  localStorage.setItem(todo[0].checklist[0].saveid,str);

 
  // テキストボックスを空にする
  titletext.val("");

}

function showText() {
		
	var list = $("#list")
  list.children().remove();
  // すでにある要素を削除する
  
  var key, value, html = [];

 //セッションストレージからタスク番号をと見込む
    value = sessionStorage.getItem("tasknum");
	

value =parseInt(value,10);

 key = localStorage.key(value);
  
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  var len=localStorage.length


 for(var i in todo){
$("#list").append("<div>"+"編集前<br>"+todo[i].dotime+"</div>");
for(var j in todo[i].checklist){
$("#list").append("<div>作成日："+todo[i].checklist[j].sakusei+"<br>詳細："+todo[i].checklist[j].task+"<br>期限："+todo[i].checklist[j].kigen+"</div>");
}

}

}


function escapeText(text) {
  return $("<div>").text(text).html();
  
}

function escapeText(text) {
  return $("<div>").text(text).html();
  
}

// 入力チェックを行う
function checkText(text) {


if(text.indexOf("&lt;")!=　-1||text.indexOf("&gt;")!=　-1){
   alert("<>の記号の使用は避けてください");
    return false;
  }

  // 文字数が0または20以上は不可
  if (0 === text.length || 160 < text.length) {
    //alert("文字数は1～20字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}

//読み込み時にテキストフォームに編集前のテキストを表示する
function readnum(){

var key, value, html = [];


    value = sessionStorage.getItem("tasknum");
	

value =parseInt(value,10);


 key = localStorage.key(value);
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  var len=localStorage.length

var tasktext = $("#formTexttask");
var datetext = $("#formTextdate");
var titletext = $("#formTexttitle");
  
  // テキストボックスを空にする
 

 for(var i in todo){
$("#tasktitle").append("<div class=todotitle>"+""+todo[i].dotime+"</div>");
for(var j in todo[i].checklist){
$("#output2").append("<div>"+"作成日"+todo[i].checklist[j].sakusei+todo[i].checklist[j].finish+"</div>");
 
}

}
tasktext.val(todo[i].checklist[j].task);
  datetext.val(todo[i].checklist[j].kigen);
  titletext.val(todo[i].dotime);
//}

}



