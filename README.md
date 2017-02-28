# MindReader 職業讀心師
<img src="public/img/gitdemo0.png" width="400"><br>
<img src="public/img/gitdemo1.png" width="400"><br>
<img src="public/img/gitdemo2.png" width="400"><br>
### 關於職業讀心師
<img src="https://www.echosteg.com/images/blog/standard/nodejs_logo.png" width="200">
<img src="https://raw.githubusercontent.com/rexxars/react-hexagon/master/logo/react-hexagon.png" width="170"><br>
使用React與Node.js框架進行開發，資料庫mLab(MongoDB)。<br>
串接機器學習問答 https://mindreader.johnthunder.one/ <br>
後台統計系統，紀錄所有使用者結果，並且依照場次進行統計<br>
#### 路由表Router : <br>
<code>
/ -> 首頁<br>
/admin -> 後台統計<br>
</code><br>
#### 版本需求Require : <br>
Node.js : 6.10.0 LTS<br>
MongoDB : 4.3<br>
### 結構示意
#### JSON資料<br>
Record : {<br>
&nbsp;&nbsp;EventName : String<br>
&nbsp;&nbsp;Professions : [{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Profession : String<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Count : Number<br>
&nbsp;&nbsp;}]<br>
}<br>
每一筆資料(Record)紀載活動場次與測試紀錄，於後端中顯示各項總和(Sum)。<br>
呼叫 : GET /record 可以取得紀錄。<br>
呼叫 : POST /record 可以上傳紀錄。<br>
  
![Alt text](/public/img/ms-logo.png)
