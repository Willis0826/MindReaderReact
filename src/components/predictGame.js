import React, { Component } from 'react';

var magicBall = {
  position: 'absolute',
  marginTop: -13 + 'px',
  marginLeft: -54 + 'px'
};
var magicBallImg = {
  width: 65 + 'px'
};
var hat = {
  position: 'absolute',
  marginTop: -20 + 'px',
  marginLeft: -40 + 'px'
};
var hatImg = {
  width: 80 + 'px'
};
var water = {
  position: 'absolute',
  marginTop: -20 + 'px',
  marginRight: -25 + 'px',
  right: 0
};
var waterImg = {
  width: 80 + 'px'
}
var jobWapper = {
  padding:10 + 'px' + 0 +'px'
}
var crystalBall = {
  position: 'absolute',
  marginTop: -20 + 'px'
}
var crystalBallImg = {
  width: 80 + 'px'
}
var crystalStar = {
  position: 'absolute',
  marginTop: -30 + 'px',
  marginLeft: -15 + 'px'
}
var crystalStarImg = {
  width: 45 + 'px'
}
var poker = {
  position: 'absolute',
  marginTop: -20 + 'px',
  marginRight: 0 + 'px',
  right: 0
}
var font_19px = {
  fontSize: 19 + 'px'
}
var span_cadetblue = {
  color: 'cadetblue',
  fontSize: 28 + 'px'
}
var span_cadetblue_24 = {
  color: 'cadetblue',
  fontSize: 24 + 'px'
}

const QuestionTable = [
  '這個工作需要常常與人接觸嗎？',
  '工作的地點通常在辦公室裡嗎？',
  '這是一個領月薪的工作嗎？',
  '因為工作而出國的機會多嗎？',
  '這個職業有制服嗎？',
  '這份工作文筆能力很重要嗎？',
  '這個職業特別注重整潔？',
  '做這個工作口語表達能力要好嗎？',
  '這個工作對體能有一定要求？',
  '要通過國家考試才可以做這份工作嗎？',
  '這個職業的人對植物的生長有一定的了解嗎？',
  '這個工作要有天馬行空的想像力？',
  '這個職業的人非常重視紀律嗎？',
  '這個職業的人會常常上電視嗎？',
  '這個工作要熟悉至少兩國語言？',
  '這個工作必須了解程式語言嗎？',
  '這個職業生活規律、上下班時間固定？',
  '這個職業非常需要相關科系背景嗎？',
  '這是一個可以在家進行工作的職業嗎？'
];
var LocalQuestion = ['你喜歡唱歌嗎？','交過3個以上的男/女朋友嗎？','你聽過臺北青年職涯發展中心嗎？','你曾經實習過嗎？','你喜歡夏天勝過冬天嗎？','你有聽過「孤單又燦爛的神－鬼怪」這部韓劇嗎？','你喜歡喝手搖飲料嗎？'];

class PredictGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBegin: false,
      isGreeting: true,
      isHavingAnswer: false,
      isRecordedWrong: false,
      isConfirmAnswer: false,
      isLocalQuestion: false,
      isReceiveResponse: false,
      queryToken: null,
      msgContent: null,
      answer: null
    };

    this.showUpMsgBox = this.showUpMsgBox.bind(this);
    this.showUpGreeting = this.showUpGreeting.bind(this);
    this.replyQuestionWithConfirm = this.replyQuestionWithConfirm.bind(this);
    this.replyQuestionWithDeny = this.replyQuestionWithDeny.bind(this);
    this.replyQuestionWithUnknow = this.replyQuestionWithUnknow.bind(this);
    this.denyAnswer = this.denyAnswer.bind(this);
    this.confirmAnswer = this.confirmAnswer.bind(this);
    this.greetingOver = this.greetingOver.bind(this);
    this.askLocalQuestion = this.askLocalQuestion.bind(this);
    this.replyLocalQuestion = this.replyLocalQuestion.bind(this);
    this.sendRecord = this.sendRecord.bind(this);
  }
  showUpMsgBox(){
    document.getElementById('greeting').className += ' out';//動畫效果
    setTimeout(()=>{
      //init game
      this.setState({isBegin: true},()=>{
        //get Question
        var xhttp = new XMLHttpRequest();
        this.state.queryToken = {
          questions: null,
          inputs: null
        };
        this.state.isReceiveResponse = false;//尚未收到回應
        xhttp.onreadystatechange = () => {
          if(xhttp.readyState == 4 && xhttp.status == 200){
            var resOject = JSON.parse(xhttp.responseText);
            var questionNum = parseInt(resOject.Question.split("Q")[1]);
            this.setState({
              isReceiveResponse: true,
              msgContent: QuestionTable[questionNum-1],
              queryToken: {
                questions: resOject.Question,
                inputs: ''
              }
            });
          }
        }
        xhttp.open("POST", "https://mindreader.johnthunder.one/");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
      });
    },800);
  }
  showUpGreeting(){
    var _queryToken = this.state.queryToken;
    var _answer = this.state.answer;
    if(this.state.isRecordedWrong){
      //已經玩過一次
      console.log(1);
      //送出紀錄資料
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "https://mindreader.johnthunder.one/savedata");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send('questions=' + _queryToken.questions + '&inputs=' + _queryToken.inputs + '&answer=' + _answer);
    }
    this.setState({
      isGreeting: true,
      isBegin: false,
      isGreeting: true,
      isHavingAnswer: false,
      isRecordedWrong: false,
      isConfirmAnswer: false,
      isReceiveResponse: false,
      queryToken: null,
      msgContent: null,
      answer: null
    });
  }
  //是 回應問題
  replyQuestionWithConfirm(){
    //動畫效果
    if(this.state.isReceiveResponse){
      this.state.isReceiveResponse = false;//尚未收到回應
      document.getElementById('question').style.opacity = 0;
      this.setState({
        queryToken: {
          questions: this.state.queryToken.questions,
          inputs: this.state.queryToken.inputs + ',5'
        }
      }, ()=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if(xhttp.readyState == 4 && xhttp.status == 200){
            this.state.isReceiveResponse = true;//收到回應
            var resOject = JSON.parse(xhttp.responseText);
            if(resOject.Question == null){
              //有答案了
              this.setState({
                isHavingAnswer: true,
                answer: resOject.Answer
              },this.sendRecord);
            }
            else{
              var questionNum = parseInt(resOject.Question.split("Q")[1]);
              this.setState({
                msgContent: QuestionTable[questionNum-1],
                queryToken: {
                  questions: this.state.queryToken.questions + "," + resOject.Question,
                  inputs: this.state.queryToken.inputs
                }
              });
            }
            //動畫效果
            document.getElementById('question').style.opacity = 1;
          }
        }
        if(this.state.queryToken.inputs.indexOf(',') == 0){
          //,在第一位 需要調整
          this.state.queryToken.inputs = this.state.queryToken.inputs.split(',')[1];
        }
        xhttp.open("POST", "https://mindreader.johnthunder.one/");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
      });
    }
  }
  //不是 回應問題
  replyQuestionWithDeny(){
    //動畫效果
    if(this.state.isReceiveResponse){
      this.state.isReceiveResponse = false;//尚未收到回應
      document.getElementById('question').style.opacity = 0;
      this.setState({
        queryToken: {
          questions: this.state.queryToken.questions,
          inputs: this.state.queryToken.inputs + ',1'
        }
      }, ()=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if(xhttp.readyState == 4 && xhttp.status == 200){
            this.state.isReceiveResponse = true;//收到回應
            var resOject = JSON.parse(xhttp.responseText);
            if(resOject.Question == null){
              //有答案了
              this.setState({
                isHavingAnswer: true,
                answer: resOject.Answer
              },this.sendRecord);
            }
            else{
              var questionNum = parseInt(resOject.Question.split("Q")[1]);
              this.setState({
                msgContent: QuestionTable[questionNum-1],
                queryToken: {
                  questions: this.state.queryToken.questions + "," + resOject.Question,
                  inputs: this.state.queryToken.inputs
                }
              },()=>{
                if(LocalQuestion.length > 0){
                  this.askLocalQuestion();
                }
              });
            }
            //動畫效果
            document.getElementById('question').style.opacity = 1;
          }
        }
        if(this.state.queryToken.inputs.indexOf(',') == 0){
          //,在第一位 需要調整
          this.state.queryToken.inputs = this.state.queryToken.inputs.split(',')[1];
        }
        xhttp.open("POST", "https://mindreader.johnthunder.one/");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
      });
    }
  }
  //不知道 回應問題
  replyQuestionWithUnknow(){
    //動畫效果
    if(this.state.isReceiveResponse){
      this.state.isReceiveResponse = false;//尚未收到回應
      document.getElementById('question').style.opacity = 0;
      this.setState({
        queryToken: {
          questions: this.state.queryToken.questions,
          inputs: this.state.queryToken.inputs + ',3'
        }
      }, ()=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if(xhttp.readyState == 4 && xhttp.status == 200){
            this.state.isReceiveResponse = true;//收到回應
            var resOject = JSON.parse(xhttp.responseText);
            if(resOject.Question == null){
              //有答案了
              this.setState({
                isHavingAnswer: true,
                answer: resOject.Answer
              },this.sendRecord);
            }
            else{
              var questionNum = parseInt(resOject.Question.split("Q")[1]);
              this.setState({
                msgContent: QuestionTable[questionNum-1],
                queryToken: {
                  questions: this.state.queryToken.questions + "," + resOject.Question,
                  inputs: this.state.queryToken.inputs
                }
              });
            }
            //動畫效果
            document.getElementById('question').style.opacity = 1;
          }
        }
        if(this.state.queryToken.inputs.indexOf(',') == 0){
          //,在第一位 需要調整
          this.state.queryToken.inputs = this.state.queryToken.inputs.split(',')[1];
        }
        xhttp.open("POST", "https://mindreader.johnthunder.one/");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
      });
    }
  }
  //確認 答案
  confirmAnswer(){
    var _answer = this.state.answer;//避免 state 被清空
    this.setState({
      isBegin: true,
      isGreeting: false,
      isHavingAnswer: true,
      isRecordedWrong: false,
      isConfirmAnswer: true,
      queryToken: null,
      answer: null,
      msgContent: <div style={font_19px}>哈哈哈哈沒錯！我就是最神的占卜師！<br/>既然你有這個夢想，就要勇敢實踐它，<br/><span style={span_cadetblue}>3/18花博爭艷館 <br/>實習就業博覽會</span><br/>快來實現你的夢想吧！</div>
    },()=>{
      var xhttp = new XMLHttpRequest();
      var newResult = {
        profession: _answer,
        isRight: 1
      };
      xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){

        }
      }
      xhttp.open("POST", "/result");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newResult));
    });
  }
  //否認 答案
  denyAnswer(){
    var _answer = this.state.answer;
    this.setState({
      isBegin: true,
      isGreeting: false,
      isHavingAnswer: true,
      isRecordedWrong: true,
      isConfirmAnswer: false,
      msgContent: <div style={font_19px}>什麼？我居然失誤了... 太可惡了！<br/>你可以告訴我妳的答案嗎！</div>
    },()=>{
      //<span style={span_cadetblue}>3/18花博爭艷館 <br/>實習就業博覽會</span>
      var xhttp = new XMLHttpRequest();
      var newResult = {
        profession: _answer,
        isRight: 0
      };
      xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){

        }
      }
      xhttp.open("POST", "/result");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newResult));
    });
  }
  greetingOver(){
    this.setState({isGreeting: false});
  }
  //Ask Local Question
  askLocalQuestion(){
    var randomIndex = Math.floor((Math.random() * LocalQuestion.length));
    this.setState({
      isLocalQuestion: true,
      localMsgContent: LocalQuestion[randomIndex]
    },()=>{
      LocalQuestion.splice(randomIndex, 1);
    });
  }
  replyLocalQuestion(){
    //動畫效果
    document.getElementById('question').style.opacity = 0;
    this.setState({
      isLocalQuestion: false
    },()=>{
      //動畫效果
      setTimeout(()=>{
        document.getElementById('question').style.opacity = 1;
      },400);
    });
  }
  //AJAX Send Record
  sendRecord(){
    //post record
    var d = new Date();
    var eventName;
    var isValidTime = true;
    if(1488384026000 > d.getTime() && d.getTime() > 1488299426000){
      //3月1
      eventName = '國北教';
    }
    else if(1488470426000 > d.getTime() && d.getTime() > 1488384026000){
      //3月2
      eventName = '文化';
    }
    else if(1488902426000 > d.getTime() && d.getTime() > 1488816026000){
      //3月7
      eventName = '台科大';
    }
    else if(1488988826000 > d.getTime() && d.getTime() > 1488902426000){
      //3月8
      eventName = '世新';
    }
    else if(1489161626000 > d.getTime() && d.getTime() > 1489075226000){
      //3月10
      eventName = '師大';
    }
    else if(1489420826000 > d.getTime() && d.getTime() > 1489334426000){
      //3月13
      eventName = '中原';
    }
    else if(1489507226000 > d.getTime() && d.getTime() > 1489420826000){
      //3月14
      eventName = '北商';
    }
    else if(1489593626000 > d.getTime() && d.getTime() > 1489507226000){
      //3月15
      eventName = '東吳';
    }
    else if(1489766426000 > d.getTime() && d.getTime() > 1489680026000){
      //3月17
      eventName = '淡江';
    }
    else if(1489852826000 > d.getTime() && d.getTime() > 1489766426000){
      //3月18
      eventName = '圓山花博';
    }
    else{
      isValidTime = false;
    }
    if(isValidTime){
      var xhttp = new XMLHttpRequest();
      var newRecord = {
        eventName: eventName,
        profession: this.state.answer
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
  render() {
    return (
      <div className="row">
        {this.state.isBegin?(
        <div>
          <img ref="bg1" src="assets/img/magicGirl.png" className="full-res-bg1" />
          <div ref="bg2" className="full-res-bg2">
          {this.state.isLocalQuestion?(
            <div id="question" className="msg_main_wrap">
              <div className="msg_main_msg">
                <h3 className="inner-msg">{this.state.localMsgContent}</h3>
              </div>
              <div className="col-xs-6 text-center">
                <div id="greenBtn" onClick={this.replyLocalQuestion} className="yes-button-wrap">
                  <div style={hat}>
                    <img style={hatImg} src="assets/img/hat.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>是的</h2>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 text-center">
                <div id="redBtn" onClick={this.replyLocalQuestion} className="no-button-wrap">
                  <div className="" style={water}>
                    <img style={waterImg} src="assets/img/water.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>不是</h2>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 text-center">
                <div id="unknowBtn" onClick={this.replyLocalQuestion} className="unknow-button-wrap">
                  <div className="" style={poker}>
                    <img style={waterImg} src="assets/img/poker.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>不確定</h2>
                  </div>
                </div>
              </div>
            </div>
          ):(
          <div id="question" className="msg_main_wrap">
          {this.state.isGreeting?(
            <div>
              <div className="msg_main_msg text-center">
                <h3 className="inner-msg">準備好了嗎？<br/>就讓我好好算算你未來的職業吧！</h3>
              </div>
              <div className="col-xs-12 text-center">
                <div id="greenBtn" onClick={this.greetingOver} className="yes-button-wrap">
                  <div style={hat}>
                    <img style={hatImg} src="assets/img/hat.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>是的</h2>
                  </div>
                </div>
              </div>
            </div>
          ):(
            <div>
              <div className="msg_main_msg">
              {this.state.isHavingAnswer && !this.state.isRecordedWrong && !this.state.isConfirmAnswer ?(
                <h3>
                  你想從事 : <br/>
                  <span className="yellow-mark"> {this.state.answer} </span><br/>
                  我猜中了嗎 ?
                  </h3>
                ):(
                  <div>
                    <h3 className="inner-msg">{this.state.msgContent}</h3>
                    {this.state.isRecordedWrong ?(
                    <div style={span_cadetblue_24} className="select-wapper">
                      <span>正確答案</span>
                      <select onChange={(e)=>{this.state.answer = e.target.value;}}>
                        <option value="軍人">軍人</option>
                        <option value="空服人員">空服人員</option>
                        <option value="記者">記者</option>
                        <option value="業務">業務</option>
                        <option value="警察">警察</option>
                        <option value="翻譯">翻譯</option>
                        <option value="農夫">農夫</option>
                        <option value="銀行員">銀行員</option>
                        <option value="工程師">工程師</option>
                        <option value="廚師">廚師</option>
                        <option value="建築師">建築師</option>
                        <option value="攝影師">攝影師</option>
                        <option value="廣告設計">廣告設計</option>
                        <option value="運動員">運動員</option>
                        <option value="老師">老師</option>
                        <option value="作家">作家</option>
                        <option value="律師">律師</option>
                        <option value="藝人">藝人</option>
                        <option value="導遊">導遊</option>
                        <option value="醫生">醫生</option>
                        </select>
                      </div>
                    ):(null)}
                  </div>
                )}
              </div>
              <div className={(this.state.isConfirmAnswer || this.state.isRecordedWrong) && this.state.isHavingAnswer?("col-xs-12 text-center"):("col-xs-6 text-center")}>
              {this.state.isHavingAnswer && (this.state.isConfirmAnswer || this.state.isRecordedWrong)?(
                <div id="againBtn" onClick={this.showUpGreeting} className="again-button-wrap">
                  <div style={magicBall}>
                    <img style={magicBallImg} src="assets/img/magic.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>再來一次</h2>
                  </div>
                </div>
              ):(
                <div id="greenBtn" onClick={this.state.isHavingAnswer?this.confirmAnswer:this.replyQuestionWithConfirm} className="yes-button-wrap">
                  <div style={hat}>
                    <img style={hatImg} src="assets/img/hat.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>是的</h2>
                  </div>
                </div>
              )}
              </div>
              {this.state.isRecordedWrong || this.state.isConfirmAnswer?(null):(
              <div className="col-xs-6 text-center">
                <div id="redBtn" onClick={this.state.isHavingAnswer?this.denyAnswer:this.replyQuestionWithDeny} className="no-button-wrap">
                  <div className="" style={water}>
                    <img style={waterImg} src="assets/img/water.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>不是</h2>
                  </div>
                </div>
              </div>
              )}
              {this.state.isHavingAnswer?(null):(
              <div className="col-xs-12 text-center">
                <div id="unknowBtn" onClick={this.replyQuestionWithUnknow} className="unknow-button-wrap">
                  <div className="" style={poker}>
                    <img style={waterImg} src="assets/img/poker.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>不確定</h2>
                  </div>
                </div>
              </div>
              )}
            </div>
            )}
          </div>
          )}
        </div>
      </div>
      ):(
      <div>
        <img ref="bgStart" src="assets/img/startMagic.png" className="full-res-bgStart"/>
        <div id="greeting" className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
          <div className="contain-white text-center">
            <h2 className="contain-title">職業讀心師</h2>
            <h3 className="contain-sub">我是擁有神秘力量的占卜師，只要你在心裡想著自己未來最想從事下列的哪一個職業，我就可以猜出來唷！</h3>
            <div className="text-center" style={jobWapper}>
              <div className="job-wrap">軍人</div>
              <div className="job-wrap">空服員</div>
              <div className="job-wrap">記者</div>
              <div className="job-wrap">業務</div>
              <div className="job-wrap">警察</div>
              <div className="job-wrap">翻譯</div>
              <div className="job-wrap">農夫</div>
              <div className="job-wrap">銀行員</div>
              <div className="job-wrap">工程師</div>
              <div className="job-wrap">廚師</div>
              <div className="job-wrap">建築師</div>
              <div className="job-wrap">攝影師</div>
              <div className="job-wrap">廣告設計</div>
              <div className="job-wrap">運動員</div>
              <div className="job-wrap">老師</div>
              <div className="job-wrap">作家</div>
              <div className="job-wrap">律師</div>
              <div className="job-wrap">藝人</div>
              <div className="job-wrap">導遊</div>
              <div className="job-wrap">醫生</div>
            </div>
            <div onClick={this.showUpMsgBox} className="start-button-wrap">
              <div className="" style={crystalBall}>
                <img style={crystalBallImg} src="assets/img/crystal-ball.png" alt="" />
              </div>
              <div className="" style={crystalStar}>
                <img style={crystalStarImg} src="assets/img/stars.png" alt="" />
              </div>
              <div className="button-text-wrap">
                <h2>開始占卜</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
    );
  }
}

export default PredictGame;
