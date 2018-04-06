import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { Car } from '../../models/car';
import { Stock } from '../../models/stock';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee-service.service';
import { StockService } from '../../services/stock.service';
import { CarService } from '../../services/car.service';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public customerArray:Customer[] = [];
  public carArray:Car [] = [];
  public stockArray:Stock[] = [];
  public stockArraySold:Stock[] = [];
  public empArray:Employee[] = [];
  public chart:Chart[] = [];
  public topFiveCus:Car []  = [];


  constructor(
    private cusService:CustomerService,
    private carService:CarService,
    private stockService: StockService,
    private empService: EmployeeService,
    private dashboard: DashboardService
  ) { }

  ngOnInit() {
    this.getCustomer();
    this.getCar();
    this.getStock();
    this.getEmployee();
  }

  getCustomer(){
    this.cusService.getCustomer().subscribe(
      res =>{
        this.customerArray = Object.values(res);
      },
      err => console.log(err)
    );
  }

  getCar(){
    this.carService.getCar().subscribe(
      res =>{
        let cars = this.dashboard.formatCars(res);
        this.carArray = cars['exist'];
        this.topFiveCus = this.dashboard.topFiveCustomer(Object.values(res || {}));
        this.doughnutChart(this.topFiveCus);
        this.lineChart();
      },
      err => console.log(err)
    );
  }

  getStock(){
    this.stockService.getStock().subscribe(
      res =>{
        let obj = this.dashboard.formateStock(res);
        this.stockArraySold = this.dashboard.formatTopFiveSold(obj['sold']);
        this.stockArray = obj['nonSold'];
        this.barChart(this.stockArraySold);
        this.pieChart(this.stockArraySold);
      },
      err => console.log(err)
    );
  }

  getEmployee(){
    this.empService.getEmployee().subscribe(
      res =>{
        this.empArray = Object.values(res);
      },
      err => console.log(err)
    );
  }

  barChart(data){
    let bar = this.dashboard.formatBarChart(data);
    this.chart['bar'] = new Chart('canvasBar', bar);
  }

  pieChart(data){
    let pie = this.dashboard.formatPieChart(data);
    this.chart['pie'] = new Chart('canvasPie', pie);
  }

  doughnutChart(data){
    let dou = this.dashboard.formatDoughnutChart(data);
    this.chart['dou'] = new Chart('canvasDou', dou);
  }

  lineChart(){
    let dates = this.dashboard.creatRandomDates();
    let month = this.dashboard.formatMonthly(dates);
    let line = this.dashboard.formatLineChart(month);
    this.chart['line'] = new Chart('canvasLine', line);
  }



}
