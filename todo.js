$(loaded);


function loaded() {
  showText();
  firstText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#saveButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
	  
    });
	
}
/*
$("body").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
     showText();
	 //require(uri);
	 
    });

*/
/*
$("#doText").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
     formresetText();
	 
    });
*/
$("#resetButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      resetText();
  showText();
      
    });
/*     
 function firstText() {
 var text = $("#doText");
  
 var val = escapeText(text.val()); 
  // テキストボックスを空にする
  text.val("ここに書いてください");

 

} 
*/
/*
function formresetText() {
 var text = $("#doText");
  
 var val = escapeText(text.val()); 
  // テキストボックスを空にする
  text.val("");
 

}   
*/

function resetText() {

 localStorage.clear();
alert("リセット");

}


//JSONをパースし、配列のデータを取得

//日付の昇順にソート


//日付のタイムスタンプ取得関数を定義



// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する


 

 var text = $("#doText");
  var time = new Date();
  var mydate=time.getDate();
  var mymonth=time.getMonth()+1;
    var myyear=time.getFullYear();
  var val = escapeText(text.val());
 
  var todo=
[{
"dotime":val,
"checklist":[
{"task":"","sakusei":myyear+"/"+mymonth+"."+mydate,"finish":"未完了","kigen":""},
//{"task":"","sakusei":time,"finish":"未完了","kigen":""}
]
},
];
 
 
 
if(checkText(val)) {
var localst=localStorage.length;
var str=JSON.stringify(todo);
  localStorage.setItem("test"+localst,str);
  
  
  // テキストボックスを空にする
  text.val("");
}
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  
  //var str=localStorage.getItem("test");
  //var todo=JSON.parse(str);
  var list = $("#list")
  list.children().remove();
  

  var key, value, html = [];
  
  for(var h=0, len=localStorage.length; h<len; h++) {
   key = localStorage.key(h);
   //value = localStorage.getItem(key);
   var str=localStorage.getItem("test"+h);
  var todo=JSON.parse(str);
  

  
  for(var i in todo){

html.push("<table class='onetodo' width='400px'><tr><td><div class='listtext'><div class='todotitle'>"+todo[i].dotime+"</div>");


for(var j in todo[i].checklist){
html.push("<div>作成日："+todo[i].checklist[j].sakusei+"<br>詳細："+todo[i].checklist[j].task+"<br>期限："+todo[i].checklist[j].kigen+"</div>");

html.push("<div id='editButton'><a href='task.html'><input id='linkButton"+h+"' type='button' style='WIDTH: 240px; HEIGHT: 20px'value='編集'></a></div><div></div></div></td><script>$('#linkButton"+h+"').click(function() { sample"+h+"(); });function sample"+h+"() { sessionStorage.setItem('aaa',"+h+");}</script>");
//html.push("<div id='editButton'><a href='task.html?keepThis=true&TB_iframe=true&height=400&width=400' class='thickbox' title='ToDo編集ページ'><input id='linkButton"+h+"' type='button' style='WIDTH: 240px; HEIGHT: 20px'value='編集'></a></div></td><script>$('#linkButton"+h+"').click(function() { sample"+h+"(); });function sample"+h+"() { sessionStorage.setItem('aaa',"+h+");}</script>");
//<script type="text/javascript" src="thickbox.js"></script>


html.push("<td><div id='checkButton'><input id='checkButton"+h+"' type='button' style='font-size:25px;WIDTH: 80px; HEIGHT: 80px 'value="+todo[i].checklist[j].finish+"></div></td></tr></table><script>$('#checkButton"+h+"').click(function() { sample"+h+"();finish();showText(); });function sample"+h+"() { sessionStorage.setItem('aaa',"+h+");}</script><br>");

}

}

}

//html.push("<script type='text/javascript' src='thickbox.js'></script>");
list.append(html.join(''));


}

function escapeText(text) {
  return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  
  
  if(text.indexOf("&lt;")!=　-1||text.indexOf("&gt;")!=　-1){
   alert("<>の記号の使用は避けてください");
    return false;
  }
 
  
  
  
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1～20字にしてください");
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


function finish() {

 var key, value, html = [];
value = sessionStorage.getItem("aaa");
value =parseInt(value,10);



 key = localStorage.key(value);
  
   var str=localStorage.getItem("test"+value);
  var todo=JSON.parse(str);
  
  todo[0].checklist[0].finish="完了";
 
  
  var str=JSON.stringify(todo);
  localStorage.setItem("test"+value,str);

}

function koshin(){

  location.reload();
}
/*
function require(uri) {
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  var temp = hour.toString() + min.toString() + sec.toString()
  script.src  = uri + '?v=' + temp;
  var head    = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}
*/
