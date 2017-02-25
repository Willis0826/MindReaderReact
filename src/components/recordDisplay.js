import React, { Component } from 'react';
import Chart from 'chart.js';

class RecordDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  componentDidMount(prevProps, prevState){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState == 4 && xhttp.status == 200){
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
            responsive:true
          }
        });
      }
    }
    xhttp.open("GET", "/record");
    xhttp.send();
  }
  render() {
    return (
      <div className="row">
        <div className="text-center">
          <h2 className="contain-title">讀心師統計</h2>
        </div>
        <div className="col-md-8 col-md-offset-2 padding-bottom-20">
          <canvas id="myChart" width="100" height="400"></canvas>
        </div>
        <div className="col-md-3 col-md-offset-3 text-center margin-bottom-20">
          <div className="btn-white">總覽(場次)</div>
        </div>
        <div className="col-md-3 text-center">
          <div className="btn-white">總覽(細節)</div>
        </div>
      </div>
    );
  }
}

export default RecordDisplay;
