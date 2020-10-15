import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  loginForm: FormGroup;

  error_messages = {
    password: [
      { type: "required", message: "password is required." },
      { type: "minlength", message: "password length." },
      { type: "maxlength", message: "password length." }
    ],
    confirmpassword: [
      { type: "required", message: "password is required." },
      { type: "minlength", message: "password length." },
      { type: "maxlength", message: "password length." }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
  ) { 
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ])
        ),
        confirmpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ])
        )
      },
      {
        validators: this.password.bind(this)
      }
    );
  }

  ngOnInit() { }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirmpassword");
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}