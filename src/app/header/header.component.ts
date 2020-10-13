import { Component, OnInit, Output, EventEmitter, Input,NgZone } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Output("toggle") navToggle = new EventEmitter();
  @Input('media_query') mobileQueryMax:boolean;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {}

  onClickNavToggle() {
    this.navToggle.emit();
  }
}
