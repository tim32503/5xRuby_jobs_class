// 變數宣告
let currentPage = 1;
let totalPage = 0;
const pageSize = 10;
const theadText = ['日期', '職位名稱', '薪資', '公司名稱', '公司地址'];

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://job-list-9527.herokuapp.com/api/v1/jobs/job_info')
    .then(response => response.json())
    .then(object => object.data)
    .then(jobList => {
      totalPage = Math.ceil(jobList.length / pageSize);

      // 處理資料表格
      dataTable(jobList, currentPage);

      // 分頁按鈕
      paginationBtn(jobList, currentPage);
    });

  // 搜尋按鈕監聽事件
  document.querySelector('.search-button').addEventListener('click', (e) => {
    let paginationEl, tableEl;
    let queryString = e.target.previousElementSibling;
    let searchAPI = 'https://job-list-9527.herokuapp.com/api/v1/jobs/search?q=' + queryString.value;
    currentPage = 1;

    fetch(searchAPI)
      .then(response => response.json())
      .then(jobList => {
        totalPage = (jobList.length === 0) ? 1 : Math.ceil(jobList.length / pageSize);

        // 刪除 container 中所有物件
        tableEl = e.target.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild;
        paginationEl = e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild;
        tableEl.remove();
        paginationEl.remove();

        // 處理資料表格
        dataTable(jobList, currentPage);

        // 分頁按鈕
        paginationBtn(jobList, currentPage);
      });
  });
});

// 表格製作
function dataTable(jobList, current){
  let table, thead, tr, tbody, a, td;

  table = document.createElement('div');
  table.classList.add('css-table');

  // 處理表頭
  thead = document.createElement('div');
  thead.classList.add('css-thead');

  tr = document.createElement('div');
  tr.classList.add('css-htr');

  theadText.forEach(element => {
    let th = document.createElement('div');
    th.classList.add('css-th');
    th.textContent = element;
    tr.appendChild(th);
  });

  thead.appendChild(tr);

  tbody = document.createElement('div');
  tbody.classList.add('css-t-body');
  
  if(jobList.length > 0){
    // callback 處理每列內容
    const callback = (job, index, array) => {
      if(index >= ((current - 1) * pageSize) && index < (current * pageSize)){
        a = document.createElement('a');
        a.classList.add('css-tr');
        a.href = 'https://' + job.link;

        td = document.createElement('div');
        td.classList.add('css-td');
        td.textContent = job.date;
        a.appendChild(td);

        td = document.createElement('div');
        td.classList.add('css-td');
        td.textContent = job.name;
        a.appendChild(td);

        td = document.createElement('div');
        td.classList.add('css-td');
        td.textContent = job.salary;
        a.appendChild(td);

        td = document.createElement('div');
        td.classList.add('css-td');
        td.textContent = job.company_name;
        a.appendChild(td);

        td = document.createElement('div');
        td.classList.add('css-td');
        td.textContent = job.address;
        a.appendChild(td);
        
        tbody.appendChild(a);
      }
    }

    // 迴圈處理callback
    jobList.forEach(callback);
  }else{
    a = document.createElement('a');
    a.classList.add('css-tr');
    a.href = '#';

    td = document.createElement('div');
    td.classList.add('css-td');
    td.textContent = '查無資料';
    a.appendChild(td);

    tbody.appendChild(a);
  }

  // 插入物件，呈現表格
  table.appendChild(thead);
  table.appendChild(tbody);
  document.querySelector('.container').appendChild(table);
}

// 分頁按鈕
function paginationBtn(jobList, current){
  let pagination, backpage, pageNumber, nextpage, counter;

  pagination = document.createElement('div');
  pagination.classList.add('pagination');
  
  backpage = document.createElement('span');
  backpage.classList.add('backpage');
  if(current === 1 ){
    backpage.classList.add('disabled');
  }
  backpage.textContent = '上一頁';
  pagination.appendChild(backpage);

  for(let i = (current - 2); i <= (current + 2); i++){
    if(i > 0 && i <= totalPage){
      pageNumber = document.createElement('span');
      pageNumber.classList.add('pageNumber');
      if(i === current){
        pageNumber.classList.add('active-background');
      }
      pageNumber.textContent = i;
      pagination.appendChild(pageNumber);
    }
  }

  nextpage = document.createElement('span');
  nextpage.classList.add('nextpage');
  if(current === totalPage ){
    nextpage.classList.add('disabled');
  }
  nextpage.textContent = '下一頁';
  pagination.appendChild(nextpage);

  counter = document.createElement('span');
  counter.classList.add('page-counter');
  counter.textContent = `${current}/${totalPage}頁`;
  pagination.appendChild(counter);

  document.querySelector('.container').appendChild(pagination);

  paginationListener(jobList);
}

// 分頁按鈕監聽事件
function paginationListener(jobList){
  let paginationEl, tableEl;
  if(currentPage > 1){
    document.querySelector('.backpage').addEventListener('click', (e) => {
      currentPage = currentPage - 1;
      tableEl = e.target.parentElement.previousElementSibling;
      tableEl.remove();
      dataTable(jobList, currentPage);

      paginationEl = e.target.parentElement;
      paginationEl.remove();
      
      paginationBtn(jobList, currentPage);
    });
  }

  document.querySelectorAll('.pageNumber').forEach((page) => {
    page.addEventListener('click', (e) => {
      currentPage = parseInt(e.target.textContent);
      tableEl = e.target.parentElement.previousElementSibling;
      tableEl.remove();
      dataTable(jobList, currentPage);

      paginationEl = e.target.parentElement;
      paginationEl.remove();
      
      paginationBtn(jobList, currentPage);
    });
  });

  if(currentPage < totalPage){
    document.querySelector('.nextpage').addEventListener('click', (e) => {
      currentPage = currentPage + 1;
      tableEl = e.target.parentElement.previousElementSibling;
      tableEl.remove();
      dataTable(jobList, currentPage);

      paginationEl = e.target.parentElement;
      paginationEl.remove();
      
      paginationBtn(jobList, currentPage);
    });
  }
}

