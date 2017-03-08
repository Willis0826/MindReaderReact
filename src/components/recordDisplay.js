import React, { Component } from 'react';
import Chart from 'chart.js';

class RecordDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      isProcessing: true,
      myChart: null,
      infoMessage: '點擊長條圖，可以獲得詳細資料'
    };
    this.displayTotalCount = this.displayTotalCount.bind(this);
    this.displaySelectedCount = this.displaySelectedCount.bind(this);
    this.displayResult = this.displayResult.bind(this);
  }
  componentDidMount(prevProps, prevState){
    this.displayTotalCount();
  }
  displayTotalCount(){
    if(this.state.myChart != null){
      //清除舊的資料
      this.state.myChart.destroy();
      this.state.myChart = null;
    }
    this.setState({
      isProcessing: true
    });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        this.setState({
          isProcessing: false,
          infoMessage: '點擊長條圖，可以獲得詳細資料'
        },()=>{
          var resObject = JSON.parse(xhttp.responseText);
          var ctx = document.getElementById("myChart");
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: resObject.schools,
              datasets: [{
                  label: '# 測驗人數',
                  data: resObject.records,
                  backgroundColor: resObject.barColors,
                  borderColor: resObject.barBorderColors,
                  borderWidth: 1,
                  fontColor: 'rgba(255,255,255,1)'
              }]
            },
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    fontColor: "rgba(255,255,255,0.8)",
                    beginAtZero:true
                  },
                  gridLines:{
                    color:"rgba(255,255,255,0.5)",
                    zeroLineColor:"rgba(255,255,255,0.5)"
                  }
                }],
                yAxes:[{
                  ticks: {
                    fontColor: "rgba(255,255,255,0.8)",
                    beginAtZero:true
                  },
                  gridLines:{
                    color:"rgba(255,255,255,0.2)",
                    zeroLineColor:"rgba(255,255,255,0.2)"
                  }
                }],
              },
              maintainAspectRatio: false,
              responsive:true,
              onClick: this.displaySelectedCount
            }
          });
          this.state.myChart = myChart;
        });
      }
    }
    xhttp.open("GET", "/record");
    xhttp.send();
  }
  displaySelectedCount(e, array){
    if(array[0]){
      if(this.state.myChart != null){
        //清除舊的資料
        this.state.myChart.destroy();
        this.state.myChart = null;
      }
      this.setState({
        isProcessing: true
      });
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
          this.setState({
            isProcessing: false,
            infoMessage: '總攬(場次)，顯示全部場次人數'
          }, ()=>{
            var resObject = JSON.parse(xhttp.responseText);
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: resObject.profession,
                datasets: [{
                    label: '# 職業人數',
                    data: resObject.count,
                    backgroundColor: resObject.barColors,
                    borderColor: resObject.barBorderColors,
                    borderWidth: 1
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    ticks: {
                      fontColor: "rgba(255,255,255,0.8)",
                      beginAtZero:true
                    },
                    gridLines:{
                      color:"rgba(255,255,255,0.5)",
                      zeroLineColor:"rgba(255,255,255,0.5)"
                    }
                  }],
                  yAxes:[{
                    ticks: {
                      fontColor: "rgba(255,255,255,0.8)",
                      beginAtZero:true
                    },
                    gridLines:{
                      color:"rgba(255,255,255,0.2)",
                      zeroLineColor:"rgba(255,255,255,0.2)"
                    }
                  }],
                },
                maintainAspectRatio: false,
                responsive:true,
                onClick: null
              }
            });
            this.state.myChart = myChart;
          })
        }
      };
      xhttp.open("GET", "/event?index=" + array[0]._index);
      xhttp.send();
    }
  }
  displayResult(){
    //顯示機器人狀態
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
      if(xhttp.readyState == 4 && xhttp.status == 200){

      }
    }
    xhttp.open("GET", "/result");
    xhttp.send();
  }
  render() {
    return (
      <div className="row">
        <div className="text-center">
          <h2 className="contain-title">讀心師統計</h2>
        </div>
        <div className="col-md-8 col-md-offset-2 padding-bottom-20">
          {this.state.isProcessing?(
          <div className="loading-wapper">
            <div className="loading-div"></div>
            <div className="loading-text">Loading</div>
          </div>
          ):(
          <canvas id="myChart" width="100" height="400"></canvas>
          )}
        </div>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-3 text-center margin-bottom-20">
            <div onClick={this.displayTotalCount} className="btn-white">總覽(場次)</div>
          </div>
          <div className="col-sm-3 text-center">
            <div className="white-text">{this.state.infoMessage}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-3 text-center margin-bottom-20">
            <div onClick={this.displayResult} className="btn-white">結果(狀態)</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecordDisplay;
