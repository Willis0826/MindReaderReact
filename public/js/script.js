var bgStart,bg1,bg2;
var isDebugMode = true;

$(document).ready(function () {
  bgStart = document.getElementsByClassName('full-res-bgStart')[0];
  bg1 = document.getElementsByClassName('full-res-bg1')[0];
  bg2 = document.getElementsByClassName('full-res-bg2')[0];
  bg1.style.display = "none";
  bg2.style.display = "none";
});

//遊戲
var questionPool;
var greenBtn = document.getElementById('greenBtn');
greenBtn.onclick = InitChecking;//開始事件
var redBtn = document.getElementById('redBtn');
redBtn.onclick = ShowUpGreeting;
var againBtn = document.getElementById('againBtn');
againBtn.onclick = ShowUpGreeting;
var startButtonWrap = document.getElementsByClassName('start-button-wrap')[0];
startButtonWrap.onclick = ShowUpMsgBox;
//不可到達描述
function Exclude(id,bool){
  this.id = id;
  this.bool = bool;
}
//問題的回答
function QuestionResult(id, bool){
  this.id = id;
  this.bool = bool;
}
//問題類別
function Question(id,topic,excludeList){
  this.id = id;
  this.topic = topic;
  this.excludeList = excludeList;
}
//問題池
function QuestionPool(){
  this.pool = [];
  this.poolCount = 0;
  this.answerPool = null;
  this.isMapReady = false;
  this.holdingQuestionIndex = 0;
}
QuestionPool.prototype.addQuestion = function (question) {
  this.pool.push(question);
  this.poolCount++;
};
QuestionPool.prototype.addAnswerPool = function (pool) {
  this.answerPool = pool;
  this.isMapReady = true;
}
QuestionPool.prototype.DivPoolByExclude = function (exclude) {
  //遍歷所有Question
  if(this.isMapReady){
    for(var i = 0; i < this.pool.length; i++){
      for(var exListIndex = 0; exListIndex < this.pool[i].excludeList.length; exListIndex++){
        if(this.pool[i].excludeList[exListIndex].id == exclude.id && this.pool[i].excludeList[exListIndex].bool == exclude.bool){
          this.pool.splice(i, 1);//刪除該index元素
          i--;//index調整
          break;
        }
      }
    }
  }
};
QuestionPool.prototype.findQuestionIndexById = function (questionId) {
  var questionIndex = null;
  for(var i = 0; i < this.pool.length; i++){
    if(this.pool[i].id == questionId){
      questionIndex = i;
      break;
    }
  }
  return questionIndex;//回傳Index
};
QuestionPool.prototype.InitChecking = function () {

  //this.RandomQuestion(Math.floor(Math.random() * this.pool.length));//隨機出題
  this.RandomQuestion(1);//從第一題開始，固定結構
};
QuestionPool.prototype.RandomQuestion = function(recommandQuestionId){
  if(this.pool.length != 0 && recommandQuestionId != null){
    var recommandQuestionIndex = this.findQuestionIndexById(recommandQuestionId);
    this.holdingQuestionIndex = recommandQuestionIndex;//依照建議進行出題
    var question = this.pool[this.holdingQuestionIndex];
    greenBtn.onclick = this.ConfirmQuestionByIndex.bind(this);
    redBtn.onclick = this.DenyQuestionByIndex.bind(this);
    AddMsg('msg_B', question.topic);
  }
  else{//答案
    bg2.className += " full-res-bg2-shine ";
    AddMsg('msg_B', '你想從事 : <br><span class="yellow-mark">' + this.answerPool.bestAnswer.title + "</span><br>我猜中了嗎 ?");
    againBtn.style.display = "inline-block";
    greenBtn.style.display = "none";
    redBtn.onclick = WrongAnswerRecord;//line 257

    //post record
    var d = new Date();
    var xhttp = new XMLHttpRequest();
    var newRecord = {
      updateTime: d.getTime().toString(),
      profession: this.answerPool.bestAnswer.title
    };
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){

      }
    }
    xhttp.open("POST", "/record");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(newRecord));
  }
}
QuestionPool.prototype.ConfirmQuestionByIndex = function(){
  var recommandQuestionId = this.answerPool.reflashAnswer(new QuestionResult(this.pool[this.holdingQuestionIndex].id, true));
  this.DivPoolByExclude(new Exclude(this.pool[this.holdingQuestionIndex].id, true));//排除
  this.pool.splice(this.holdingQuestionIndex, 1);//刪除該index元素
  this.RandomQuestion(recommandQuestionId);//下一個問題
}
QuestionPool.prototype.DenyQuestionByIndex = function () {
  //拒絕之後，要依照權重來決定是否刪除該答案，並且重新設定第二解為答案
  var recommandQuestionId = this.answerPool.reflashAnswer(new QuestionResult(this.pool[this.holdingQuestionIndex].id, false));
  this.DivPoolByExclude(new Exclude(this.pool[this.holdingQuestionIndex].id, false));//排除
  this.pool.splice(this.holdingQuestionIndex, 1);//刪除該index元素
  this.RandomQuestion(recommandQuestionId);//下一個問題
};

//答案
function Answer(title, questionResultList){
  this.title = title;
  this.probability = 0;
  this.correctCount = 0;
  this.questionResultList = questionResultList;
  this.questionOriginCount = questionResultList.length;
}
Answer.prototype.calcProbabilityByQuestionResult = function (q) {
  for (var i = 0; i < this.questionResultList.length; i++) {
    if(this.questionResultList[i].id == q.id){
      if(this.questionResultList[i].bool == q.bool){
        this.questionResultList.splice(i, 1);//刪除該結果元素，以保持代問問題為最新
        this.correctCount++;
      }
      else{
        this.questionResultList.splice(i, 1);//刪除該結果元素，以保持代問問題為最新
        this.correctCount = 0;
      }
    }
  }
  this.probability = this.correctCount / this.questionOriginCount;
};
Answer.prototype.recommandQuestionId = function(){
  if(this.questionResultList.length != 0){
    return this.questionResultList[0].id;//從最前方選取問題
  }
  else{
    //正確數量 等於 題目數量
    //解答機率等於 1
    return null;
  }
}
//答案池
function AnswerPool(){
  this.bestAnswer = null;
  this.secondAnswer = null;//第二個可能的答案
  this.answerList = []
  this.answerTotalCount = 0;
}
AnswerPool.prototype.AddAnswer = function (answer) {
  this.answerList.push(answer);
  this.bestAnswer = answer;//預設最佳答案為最後一個加入答案池的答案
  this.secondAnswer = answer;//預設第二答案
  this.answerTotalCount++;
};
AnswerPool.prototype.reflashAnswer = function (questionResult) {
  for(var i = 0 ; i < this.answerList.length ; i++){
    if(this.answerList[i] != null){//Safty Check
      this.answerList[i].calcProbabilityByQuestionResult(questionResult);
      if(this.answerList[i].probability > this.bestAnswer.probability){//出現更動
        this.secondAnswer = this.bestAnswer;
        this.bestAnswer = this.answerList[i];
      }
      if(isDebugMode){
        console.log(this.answerList[i].title + " 目前機率 : " + this.answerList[i].probability);
      }
    }
  }
  var recommandQuestionId = this.bestAnswer.recommandQuestionId();
  if(isDebugMode){
    console.log(recommandQuestionId);
  }
  return recommandQuestionId;
};

function InitChecking(){
  bg2.className = "full-res-bg2";
  questionPool = new QuestionPool();
  questionPool.addQuestion(new Question(1,"這個工作需要常常與人接觸嗎 ?",[]));
  questionPool.addQuestion(new Question(2,"工作的地點通常在辦公室裡嗎 ?",[]));
  questionPool.addQuestion(new Question(3,"這是一個領月薪的工作嗎 ?",[]));
  questionPool.addQuestion(new Question(4,"這個職業特別注重整潔 ?",[]));
  questionPool.addQuestion(new Question(5,"這個職業的人非常重視紀律嗎 ?",[]));
  questionPool.addQuestion(new Question(6,"這是一個生活規律，薪資穩定的職業 ?",[]));
  questionPool.addQuestion(new Question(7,"因為工作而出國機會多嗎 ?",[]));
  questionPool.addQuestion(new Question(8,"需要領導能力 ?",[]));
  questionPool.addQuestion(new Question(9,"這個職業的人會常常上電視嗎 ?",[]));
  questionPool.addQuestion(new Question(10,"這份工作文筆能力很重要嗎 ?",[]));
  questionPool.addQuestion(new Question(11,"做這個工作口條要好嗎？",[]));
  questionPool.addQuestion(new Question(12,"這個職業有制服嗎 ?",[]));
  questionPool.addQuestion(new Question(13,"這個工作對體能有一定要求 ?",[]));
  questionPool.addQuestion(new Question(14,"這個職業周休二日嗎 ?",[]));
  questionPool.addQuestion(new Question(15,"要通過國家考試才可以做這份工作嗎 ?",[]));
  questionPool.addQuestion(new Question(16,"這個工作要熟悉至少兩種語言 ?",[]));
  questionPool.addQuestion(new Question(17,"這個職業的人對植物的生長有一定的了解嗎 ?",[]));
  questionPool.addQuestion(new Question(18,"這個工作要有天馬行空的想像力 ?",[]));
  questionPool.addQuestion(new Question(19,"這個工作必須了解程式語言嗎 ?",[]));

  var answerPool = new AnswerPool();
  answerPool.AddAnswer(new Answer("軍人", [new QuestionResult(1, false), new QuestionResult(2, false), new QuestionResult(3, true), new QuestionResult(4, false), new QuestionResult(5, true)]));
  answerPool.AddAnswer(new Answer("空服人員", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, true), new QuestionResult(8, false), new QuestionResult(9, false)]));
  answerPool.AddAnswer(new Answer("記者", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, true), new QuestionResult(8, false), new QuestionResult(9, true), new QuestionResult(10, true)]));
  answerPool.AddAnswer(new Answer("業務", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, false), new QuestionResult(11, true)]));
  answerPool.AddAnswer(new Answer("警察", [new QuestionResult(1, true), new QuestionResult(6, true), new QuestionResult(12, true), new QuestionResult(13, true)]));
  answerPool.AddAnswer(new Answer("翻譯", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, false), new QuestionResult(15, false), new QuestionResult(16, true)]));
  answerPool.AddAnswer(new Answer("農夫", [new QuestionResult(1, false), new QuestionResult(2, false), new QuestionResult(3, false), new QuestionResult(17, true)]));
  answerPool.AddAnswer(new Answer("銀行員", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, true), new QuestionResult(18, false), new QuestionResult(19, false)]));
  answerPool.AddAnswer(new Answer("工程師", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, true), new QuestionResult(18, false), new QuestionResult(19, true)]));
  answerPool.AddAnswer(new Answer("廚師", [new QuestionResult(1, false), new QuestionResult(2, false), new QuestionResult(3, true), new QuestionResult(4, true)]));
  answerPool.AddAnswer(new Answer("建築師", [new QuestionResult(1, false), new QuestionResult(2, false), new QuestionResult(3, true), new QuestionResult(4, false), new QuestionResult(5, false)]));
  answerPool.AddAnswer(new Answer("攝影師", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, false), new QuestionResult(11, false)]));
  answerPool.AddAnswer(new Answer("廣告設計", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, true), new QuestionResult(18, true)]));
  answerPool.AddAnswer(new Answer("運動員", [new QuestionResult(1, false), new QuestionResult(2, false), new QuestionResult(3, false), new QuestionResult(17, false)]));
  answerPool.AddAnswer(new Answer("老師", [new QuestionResult(1, true), new QuestionResult(6, true), new QuestionResult(12, false)]));
  answerPool.AddAnswer(new Answer("作者", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, false), new QuestionResult(15, false), new QuestionResult(16, false)]));
  answerPool.AddAnswer(new Answer("律師", [new QuestionResult(1, false), new QuestionResult(2, true), new QuestionResult(14, false), new QuestionResult(15, true)]));
  answerPool.AddAnswer(new Answer("藝人", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, true), new QuestionResult(8, false), new QuestionResult(9, true), new QuestionResult(10, false)]));
  answerPool.AddAnswer(new Answer("導遊", [new QuestionResult(1, true), new QuestionResult(6, false), new QuestionResult(7, true), new QuestionResult(8, true)]));
  answerPool.AddAnswer(new Answer("醫生", [new QuestionResult(1, true), new QuestionResult(6, true), new QuestionResult(12, true), new QuestionResult(13, false)]));

  //按鈕復原
  againBtn.style.display = "none";
  againBtn.parentNode.className = "col-xs-6 text-center";
  againBtn.style.marginLeft = "0px";
  greenBtn.style.display = "block";
  redBtn.style.display = "block";
  questionPool.addAnswerPool(answerPool);
  questionPool.InitChecking();
}

function AddMsg(inner_class,text){
  var questionContainer = document.getElementsByClassName('msg_main_msg')[0];
  var questionContainerParent = document.getElementById('question');
  if(questionContainer != null){
    questionContainerParent.style.transition = "none";
    questionContainerParent.style.opacity = 0;
    questionContainer.innerHTML = "<h3 class='inner-msg'>" + text + "</h3>";
    setTimeout(function(){
      questionContainerParent.style.transition = "all .5s ease-in-out";
      questionContainerParent.style.opacity = 1;
    }, 200);
  }
}

/*
questionPool.DivPoolByExclude(new Exclude(1, true));
questionPool.DivPoolByExclude(new Exclude(2, true));
*/


//開始對話
function ShowUpMsgBox(){
  document.getElementById('greeting').style.display = "none";
  document.getElementById('question').style.display = "table-cell";
  bg1.style.display = "block";
  bg2.style.display = "table";
  UpdateImgPos();
  InitChecking();//略過 greeting，直接 RandomQuestion
}
//我想想 點擊，回到一開始的畫面
function ShowUpGreeting(){
  document.getElementById('greeting').getElementsByClassName('contain-white')[0].style.background = "rgba(0,0,0,.8)";
  document.getElementById('greeting').style.display = "block";
  document.getElementById('question').style.display = "none";
}
//機器人猜錯
function WrongAnswerRecord(){
  bg2.className = "full-res-bg2";
  //紀錄使用者錯誤回報
  console.log(JSON.stringify(questionPool));
  //按鈕置中
  againBtn.parentNode.className = "col-xs-12 text-center";
  againBtn.style.marginLeft = "20px";
  redBtn.style.display = "none";//red button hiddeen
  AddMsg("temp", "什麼 ! 我答錯了嗎 ? <br>下一次我會想得更清楚的，再一次。");
}

function UpdateImgPos(){
  //bgStart
  bgStart.style.display = "none";
  //人物
  bg1.style.display = "block";
  bg1.style.left = "50%";
  bg1.style.marginLeft = "-" + (bg1.getClientRects()[0].width / 2.0) + "px"; //置中
  bg1.style.bottom = "250px";
  //水晶球
  bg2.style.zIndex = "1000";
  bg2.style.display = "table";
  bg2.style.width = "450px";
  bg2.style.height = "450px";
  bg2.style.left = "50%";
  bg2.style.marginLeft = "-" + (bg2.getClientRects()[0].width / 2.0) + "px";
  bg2.style.padding = (bg2.getClientRects()[0].width / 4.5) + "px";
  bg2.style.paddingTop = (bg2.getClientRects()[0].width / 10) + "px";
  bg2.style.bottom = "50%";
  bg2.style.marginBottom = "-375px";
}

//更新留言的內容
function UpdateMesBoxContent(){

}
