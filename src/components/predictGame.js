import React, { Component } from 'react';

var magicBall = {
  position: 'absolute',
  marginTop: -10 + 'px',
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

class PredictGame extends Component {
  constructor(props){
    super(props);
    this.state = {

    };

    this.showUpMsgBox = this.showUpMsgBox.bind(this);
    this.replyQuestion = this.replyQuestion.bind(this);
    this.makeDecision = this.makeDecision.bind(this);
  }
  showUpMsgBox(){
    //init game
    
  }
  replyQuestion(){

  }
  makeDecision(){

  }
  render() {
    return (
      <div>
        <img ref="bgStart" src="assets/img/startMagic.png" className="full-res-bgStart"/>
        <img ref="bg1" src="assets/img/magicGirl.png" className="full-res-bg1" />
        <div ref="bg2" className="full-res-bg2">
          <div id="question" className="msg_main_wrap">
            <div className="msg_main_msg">
              <h3 className="inner-msg">我是擁有神秘力量的占卜師，只要你在心裡想著自己未來最想從事下列的哪一個職業，我就可以猜出來唷！</h3>
            </div>
            <div className="col-xs-6 text-center">
              <div id="againBtn" className="again-button-wrap">
                <div style={magicBall}>
                  <img style={magicBallImg} src="assets/img/magic.png" alt="" />
                </div>
                <div className="button-text-wrap">
                  <h2>再來一次</h2>
                </div>
              </div>
              <div id="greenBtn" className="yes-button-wrap">
                <div style={hat}>
                  <img style={hatImg} src="assets/img/hat.png" alt="" />
                </div>
                <div className="button-text-wrap">
                  <h2>是的</h2>
                </div>
              </div>
            </div>
            <div className="col-xs-6 text-center">
              <div id="redBtn" className="no-button-wrap">
                <div className="" style={water}>
                  <img style={waterImg} src="assets/img/water.png" alt="" />
                </div>
                <div className="button-text-wrap">
                  <h2>不是</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
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
        <script src='assets/js/script.js'></script>
      </div>
    );
  }
}

export default PredictGame;
