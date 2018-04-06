import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input('status') status:string ='';
  @Input('code') code:number = 0;

  constructor() { }

  ngOnInit() {
  }

  cancel(){
    this.code = 0;
  }

}
