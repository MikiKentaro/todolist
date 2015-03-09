$(loaded);


function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#saveButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
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

//入力さてたテキストをタスク名に保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する

 var text = $("#doText");
  var time = new Date();
  var mydate=time.getDate();
  var mymonth=time.getMonth()+1;
    var myyear=time.getFullYear();
  var val = escapeText(text.val());
 var date_obj = new Date(2015,3,10,23,24,59,999);
  var savetime=9999999999999-time;

 //alert(savetime);
  var todo=
[{
"dotime":val,
"checklist":[
{"task":"","sakusei":myyear+"/"+mymonth+"/"+mydate,"finish":"未完了","kigen":"","saveid":savetime},
]
},
];
 
if(checkText(val)) {

var str=JSON.stringify(todo);
  localStorage.setItem(savetime,str);
  //alert("tesb"+localst);
  
  // テキストボックスを空にする
  text.val("");
}
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  
  var list = $("#list")
  list.children().remove();
  

  var key, value, html = [];
  var str;
  
  for(var h=0, len=localStorage.length; h<len; h++) {
   key = localStorage.key(h);
   
   str=localStorage.getItem(key);
   //alert("test"+hh);
  var todo=JSON.parse(str);
  

  
  for(var i in todo){

html.push("<table class='onetodo' width='400px'><tr><td><div class='listtext'><div class='todotitle'>"+todo[i].dotime+"</div>");


for(var j in todo[i].checklist){
html.push("<div>作成日："+todo[i].checklist[j].sakusei+"<br>詳　 細："+todo[i].checklist[j].task+"<br>期　 限："+todo[i].checklist[j].kigen+"</div>");

html.push("<div id='editButton'><a href='task.html'><input id='linkButton"+h+"' type='button' style='WIDTH: 240px; HEIGHT: 20px'value='編　集'></a></div><div></div></div></td><script>$('#linkButton"+h+"').click(function() { editbutton"+h+"(); });function editbutton"+h+"() { sessionStorage.setItem('tasknum',"+h+");}</script>");


html.push("<td><div id='checkButton'><input id='checkButton"+h+"' type='button' style='font-size:25px;WIDTH: 80px; HEIGHT: 80px 'value="+todo[i].checklist[j].finish+"></div></td></tr></table><script>$('#checkButton"+h+"').click(function() { finbutton"+h+"();finish();showText(); });function finbutton"+h+"() { sessionStorage.setItem('tasknum',"+h+");}</script><br>");

}

}

}

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

//”未完了”のボタンを押すと”完了”に変化する
function finish() {

 var key, value, html = [];
value = sessionStorage.getItem("tasknum");
value =parseInt(value,10);


 key = localStorage.key(value);
  
   var str=localStorage.getItem(key);
  var todo=JSON.parse(str);
  
  todo[0].checklist[0].finish="完了";
 
  
  var str=JSON.stringify(todo);
  localStorage.setItem(todo[0].checklist[0].saveid,str);

}

