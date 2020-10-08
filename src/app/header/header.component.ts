import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  demoMailNoti = 50;
  demoNoti = 9;
  @Output("toggle") navToggle = new EventEmitter();
  @Input('media_query') mobileQueryMax:boolean;

  constructor() {}

  ngOnInit(): void {}

  onClickNavToggle() {
    this.navToggle.emit();
  }
}
