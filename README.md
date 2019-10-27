# MindReader 職業讀心師
<img src="public/img/gitdemo0.png" width="400"><br>
<img src="public/img/gitdemo1.png" width="400"><br>
<img src="public/img/gitdemo2.png" width="400"><br>
<img src="public/img/gitdemo3.png" width="400"><br>
### 關於職業讀心師
<img src="https://raw.githubusercontent.com/rexxars/react-hexagon/master/logo/react-hexagon.png" width="170"/><br>

使用React與Node.js框架進行開發，資料庫mLab(MongoDB)。  

串接機器學習問答 https://mindreader.johnthunder.one/  

後台統計系統，紀錄所有使用者結果，並且依照場次進行統計  

#### 路由表Router :  
`/` -> 首頁  
`/admin` -> 後台統計  

#### 版本需求Require :  
Node.js : 6.10.0 LTS  
MongoDB : 4.3  
### 結構示意
#### JSON資料

Record : 
```json
{
  "EventName" : "NTUE",
  "Professions" : 
  [
    {
      "Profession" : "doctor",
      "Count" : 1
    },
    {
      "Profession" : "teacher",
      "Count" : 1
    }
  ]
}
```

每一筆資料(Record)紀載活動場次與測試紀錄，於後端中顯示各項總和(Sum)。<br>
Call : GET `/record` 可以取得紀錄。<br>
Call : POST `/record` 可以上傳紀錄。<br>

<img src="public/img/ms-logo.png" width="200"/>
