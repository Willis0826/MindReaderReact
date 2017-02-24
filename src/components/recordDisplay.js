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
        var resOject = JSON.parse(xhttp.responseText);

      }
    }
    xhttp.open("GET", "/record");
    xhttp.send();
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["國立台北教育大學", "國立臺灣科技大學", "銘傳大學(台北)", "國立臺北商業大學", "東吳大學", "東海"],
        datasets: [{
            label: '# 測驗人數',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        },
        maintainAspectRatio: false,
        responsive:true
      }
    });
    console.log(myChart);
  }
  render() {
    return (
      <div className="row">
        <div className="text-center">
          <h2 className="contain-title">讀心師統計</h2>
        </div>
        <canvas id="myChart" width="100" height="100"></canvas>
        <div className="col-md-6 text-center">
          <div className="btn-white">總覽(場次)</div>
        </div>
        <div className="col-md-6 text-center">
          <div className="btn-white">總覽(細節)</div>
        </div>
      </div>
    );
  }
}

export default RecordDisplay;
