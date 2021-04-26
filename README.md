# 5xRuby_jobs_class
任務：實作一個簡易的職缺搜尋

![截圖 2021-04-22 下午12 29 29](https://user-images.githubusercontent.com/67591631/115655717-6e73b300-a366-11eb-9289-3f892d16ed42.png)

#### 步驟一： 串接 API 將資料取回
1. url => https://job-list-9527.herokuapp.com/api/v1/jobs/job_info 

#### 步驟二： Render 職缺資訊
1. 將需要用到欄位資訊職缺資訊放進 template，並渲染在 `<div class="container"> 目標位置 </div>` 裡面 。
<br>
template:

```<div class="css-table">
  <div class="css-thead">
    <div class="css-tr">
      <div class="css-th">日期</div>
      <div class="css-th">職位名稱</div>
      <div class="css-th">薪資</div>
      <div class="css-th">公司名稱</div>
      <div class="css-th">公司地址</div>
    </div>
  </div>
  <div class="css-t-body">
    <a class="css-tr" href='#'>
      <div class="css-td">2021-04-01</div>
      <div class="css-td">Rails 工程師</div>
      <div class="css-td">40000 ~ 50000</div>
      <div class="css-td">五倍紅寶石</div>
      <div class="css-td">台北市中正區衡陽路7號5樓</div>
    </a>
  </div>
</div>
<div class="pagination">
  <span class="backpage hidden">上一頁</span>
  <span class="nextpage">下一頁</span>
  <span class="page-counter"> 1/1 頁<span>
</div>
```
    
註解：<br>
帶入欄位資訊 => link, date, name, salary, company_name, address

#### 步驟三： 分頁
1. 每一頁都只會有 10 筆資料，例如總共有 202 筆職缺資訊，將會有 21 頁。
2. 點擊頁碼可以切換該頁 10 筆資料。
3. 該頁頁碼需加 active-background (class) 。
4. 頁碼呈現方式為該頁前後兩頁。<br>
例如:<br>
現在頁面為 4 ，而頁碼是 2 3 4 5 6，<br>
如果是 2，頁碼是 1 2 3 4 ，<br>
如果是 1，頁碼 1 2 3 ，<br>
尾頁則是相反。

#### 步驟四：上下頁
1. 增加 上下頁 Button 切換頁面功能 。
2. 當現在處於第一頁，上一頁按鈕會消失。
3. 當現在處於最後一頁，下一頁按鈕會消失。

#### 步驟五：搜尋
1. urlSearch => 'https://job-list-9527.herokuapp.com/api/v1/jobs/search?q=要帶入的搜尋參數'
2. 搜尋後的頁面功能均須包含前四個步驟。
