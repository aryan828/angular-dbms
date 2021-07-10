import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  sideBarOpened = false;

  ngOnInit(): void {
  }

  sideBarToggler($event: any) {
    this.sideBarOpened = !this.sideBarOpened;
  }

}
