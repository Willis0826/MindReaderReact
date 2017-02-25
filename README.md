# MindReader 職業讀心師
![Alt text](/public/img/startMagic.png)
### 關於職業讀心師
<img src="https://www.echosteg.com/images/blog/standard/nodejs_logo.png" width="200">
<img src="https://raw.githubusercontent.com/rexxars/react-hexagon/master/logo/react-hexagon.png" width="170"><br>
使用React與Node.js框架進行開發，資料庫mLab(MongoDB)。<br>
串接機器學習問答 http://128.199.155.52:5555/ <br>
後台統計系統，紀錄所有使用者結果，並且依照場次進行統計<br>
#### 路由表Router : <br>
<code>
/ -> 首頁<br>
/admin -> 後台統計<br>
</code><br>
#### 版本需求Require : <br>
Node.js : 6.10.0 LTS<br>

### 結構示意
QuestionPool <br>
&nbsp;&nbsp;|<br>
&nbsp;&nbsp;|--AnswerPool<br>
&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--bestAnswer<br>
&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Answer[]<br>
&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--probability<br>
&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--QuestionResult[]<br>
&nbsp;&nbsp;|<br>
&nbsp;&nbsp;|--Question[]<br>
  
![Alt text](/public/img/ms-logo.png)
