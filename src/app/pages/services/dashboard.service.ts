import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() { }

  formateStock(data){
    let arr = [], sold= [];
    for(let k in data){
      for (let i of Object.values(data[k])){
        if(i.sold==false) arr.push(i);
        else sold.push(i)
      }
    }
    return {nonSold:arr,sold:sold};
  }

  formatTopFiveSold(data){
    let arr = [], cate = [];
    for(let i of data){
      let obj = {};
      let index = cate.indexOf(i.category);
      if(index<0){
        obj['category'] = i.category;
        obj['quantity'] = 1;
        arr.push(obj);
        cate.push(i.category);
      } else {
        obj = arr[index];
        obj['quantity'] += 1;
      }
    }
    arr.sort((a,b)=> b['quantity'] - a['quantity']);
    return arr.length>5?arr.slice(0,5):arr;
  }

  formatBarChart(sold){
    let label=[], data=[];
    for(let s of sold){
      label.push(s.category);
      data.push(s.quantity);
    }
    return this.barchart({label:label, data:data});
  }

  private barchart(bar){
    return {
      type: 'bar',
      data: {
        labels: bar['label'],
        datasets: [{
          label: 'Top 5 Sold',
          data:bar['data'],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1 
        }]
      },
      options: {
        scales: {
          yAxes:[{
            ticks: {
              stepSize: 1,
              min: 0
            }
          }]
        },
        tooltips: {
          callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index]+ ' ('+ dataset.data[tooltipItem.index] + ')';
              }
          }
        }
      }
    }
  }

  formatPieChart(sold){
    let label=[], data=[];
    let total = sold.reduce(((t,s)=> t + s.quantity),0);
    for(let s of sold){
      label.push(s.category);
      let qun = (s.quantity/total)*100;
      data.push(Math.round(qun));
    }
    return this.pieChart({label:label, data:data});
  }

  private pieChart(pie){
    return{
      type: 'pie',
      data:{ 
        labels: pie.label,
        datasets: [{
          data: pie.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        tooltips: {
          callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index]+ ' ('+ dataset.data[tooltipItem.index] + '%)';
              }
          }
      }
      }
    }
  }

  formatCars(data){
    let non = [], exist= [];
      if(data){
        for (let i of Object.values(data)){
          if(i.checkOut==false) exist.push(i);
          else non.push(i)
        }
      }
    return {exist:exist,nonexist:non};
  }

  topFiveCustomer(data){
    let arr = [], cus = [];
    for(let i of data){
      let obj = {};
      let index = cus.indexOf(i.customer.regNo);
      if(index<0){
        obj['customer'] = i.customer;
        obj['times'] = 1;
        arr.push(obj);
        cus.push(i.customer.regNo);
      } else {
        obj = arr[index];
        obj['times'] += 1;
      }
    }
    arr.sort((a,b)=> b['times'] - a['times']);
    return arr.length>5?arr.slice(0,5):arr;
  }

  formatDoughnutChart(cus){
    let label=[], data=[];
    let total = cus.reduce(((t,s)=> t + s.times),0);
    let i = 1;
    for(let s of cus){
      label.push('Pos-'+ i++);
      let qun = (s.times/total)*100;
      data.push(Math.round(qun));
    }
    return this.doughnutChart({label:label, data:data});
  }

  private doughnutChart(dou){
    return{
      type: 'doughnut',
      data:{ 
        labels: dou.label,
        datasets: [{
          data: dou.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        tooltips: {
          callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index]+ ' ('+ dataset.data[tooltipItem.index] + '%)';
              }
          }
      }
      }
    }
  }

  creatRandomDates(){
    var date1 = new Date(2018,0,1), date2 = new Date(2018,11,31);
    let dateArray = [];
    for(let i=0;i<100;i++){
      var date = date1.getTime() + Math.random() * (date2.getTime() - date1.getTime());
      dateArray.push(date);
    }
    
    return dateArray;
  }

  formatMonthly(arr){
    let ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let month = [], a= [];
    for(let m of arr){
      let d = new Date(m).getMonth();
      let mo = ms[d];
      let obj = {};
      let index = a.indexOf(mo);
      if(index<0){
        obj['index'] = d;
        obj['name'] = mo;
        obj['count'] = 1;
        month.push(obj);
        a.push(mo);
      } else {
        obj = month[index];
        obj['count'] += 1;
      }
    }
    month.sort((a, b)=>{  
      return a['index']-b['index'];
    });
    return month;
  }

  formatLineChart(month){
    let label=[], data=[];
    for(let s of month){
      label.push(s.name);
      data.push(s.count);
    }
    return this.linechart({label:label, data:data});
  }

  private linechart(line){
    return {
      type: 'line',
      data: {
        labels: line['label'],
        datasets: [{
          label: 'Total car Entries',
          data:line['data'],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1 
        }]
      },
      options: {
        scales: {
          yAxes:[{
            ticks: {
              stepSize: 2,
              min: 0
            }
          }]
        }
      }
    }
  }

}
