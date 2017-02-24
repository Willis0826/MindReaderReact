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

class PredictGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBegin: false,
      isHavingAnswer: false,
      isRecordedWrong: false,
      queryToken: null,
      msgContent: null,
      answer: null
    };

    this.showUpMsgBox = this.showUpMsgBox.bind(this);
    this.showUpGreeting = this.showUpGreeting.bind(this);
    this.replyQuestionWithConfirm = this.replyQuestionWithConfirm.bind(this);
    this.replyQuestionWithDeny = this.replyQuestionWithDeny.bind(this);
    this.denyAnswer = this.denyAnswer.bind(this);
    this.sendRecord = this.sendRecord.bind(this);
  }
  showUpMsgBox(){
    //init game
    this.setState({isBegin: true},()=>{
      //get Question
      var xhttp = new XMLHttpRequest();
      this.state.queryToken = {
        questions: null,
        inputs: null
      };
      xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
          var resOject = JSON.parse(xhttp.responseText);
          var questionNum = parseInt(resOject.Question.split("Q")[1]);
          this.setState({
            msgContent: QuestionTable[questionNum-1],
            queryToken: {
              questions: resOject.Question,
              inputs: ''
            }
          });
        }
      }
      xhttp.open("POST", "http://128.199.155.52:5555/");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
    });
  }
  showUpGreeting(){
    this.setState({
      isBegin: false,
      isHavingAnswer: false,
      isRecordedWrong: false,
      queryToken: null,
      msgContent: null,
      answer: null
    });
  }
  replyQuestionWithConfirm(){
    this.setState({
      queryToken: {
        questions: this.state.queryToken.questions,
        inputs: this.state.queryToken.inputs + ',5'
      }
    }, ()=>{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=> {
        if(xhttp.readyState == 4 && xhttp.status == 200){
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
        }
      }
      if(this.state.queryToken.inputs.indexOf(',') == 0){
        //,在第一位 需要調整
        this.state.queryToken.inputs = this.state.queryToken.inputs.split(',')[1];
      }
      xhttp.open("POST", "http://128.199.155.52:5555/");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
    });
  }
  replyQuestionWithDeny(){
    this.setState({
      queryToken: {
        questions: this.state.queryToken.questions,
        inputs: this.state.queryToken.inputs + ',1'
      }
    }, ()=>{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=> {
        if(xhttp.readyState == 4 && xhttp.status == 200){
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
        }
      }
      if(this.state.queryToken.inputs.indexOf(',') == 0){
        //,在第一位 需要調整
        this.state.queryToken.inputs = this.state.queryToken.inputs.split(',')[1];
      }
      xhttp.open("POST", "http://128.199.155.52:5555/");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send('questions=' + this.state.queryToken.questions + '&inputs=' + this.state.queryToken.inputs);
    });
  }
  denyAnswer(){
    this.setState({
      isBegin: true,
      isHavingAnswer: true,
      isRecordedWrong: true,
      queryToken: null,
      msgContent: <div>什麼！我答錯了嗎？<br/>下一次我會想得更清楚的，在一次。</div>
    });
  }
  //AJAX Send Record
  sendRecord(){
    //post record
    var d = new Date();
    var xhttp = new XMLHttpRequest();
    var newRecord = {
      updateTime: d.getTime().toString(),
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
  render() {
    return (
      <div className="row">
        {this.state.isBegin?(
        <div>
          <img ref="bg1" src="assets/img/magicGirl.png" className="full-res-bg1" />
          <div ref="bg2" className="full-res-bg2">
            <div id="question" className="msg_main_wrap">
              <div className="msg_main_msg">
                {this.state.isHavingAnswer && !this.state.isRecordedWrong?(
                  <h3>
                    你想從事 : <br/>
                    <span className="yellow-mark"> {this.state.answer} </span><br/>
                    我猜中了嗎 ?
                  </h3>
                ):(
                  <h3 className="inner-msg">{this.state.msgContent}</h3>
                )}
              </div>
              <div className={this.state.isRecordedWrong && this.state.isHavingAnswer?("col-xs-12 text-center"):("col-xs-6 text-center")}>
                {this.state.isHavingAnswer?(
                <div id="againBtn" onClick={this.showUpGreeting} className="again-button-wrap">
                  <div style={magicBall}>
                    <img style={magicBallImg} src="assets/img/magic.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>再來一次</h2>
                  </div>
                </div>
                ):(
                <div id="greenBtn" onClick={this.replyQuestionWithConfirm} className="yes-button-wrap">
                  <div style={hat}>
                    <img style={hatImg} src="assets/img/hat.png" alt="" />
                  </div>
                  <div className="button-text-wrap">
                    <h2>是的</h2>
                  </div>
                </div>
                )}
              </div>
              {this.state.isRecordedWrong?(
              <div></div>
              ):(
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
            </div>
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