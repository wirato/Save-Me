import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public location:Location,
    private route:Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
  checkemail(){
    window.open("https://mail.google.com/mail/u/0/#inbox")
  }

  // backtologin():void{
  //   // location.reload(true);
  //   this.route.navigateByUrl('/sign-in',{skipLocationChange:true}).then(()=>{
  //     this.route.navigate([decodeURI(this.location.path())]);
  //   })
  // };
};