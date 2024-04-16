// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
    private spinnerService: NgxSpinnerService,

  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  login() {
    this.spinnerService.show();
    this.loginService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.token) {
          console.log(res.token)
          // Save the token in local storage
          localStorage.setItem('token', res.token);
          this.toastrService.success('Login Success', 'Success', {
            timeOut: 2000
          });
          this.router.navigateByUrl('/books');
        } else {
          this.toastrService.error('Wrong Credintials');
        }
      },
      error => {
        this.toastrService.error('Error logging in: ' + error.message);
      }
    ).add(() => {
      this.spinnerService.hide();
    });
  }
}
