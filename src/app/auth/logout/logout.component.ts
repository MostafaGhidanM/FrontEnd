import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    console.log(localStorage.getItem('token'))
    const token = localStorage.getItem('token');
    this.spinnerService.show();
    this.loginService.logout(token).subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth');
      },
      error => {
        this.toastrService.error('Error logging out: ' + error.message);
      }
    ).add(() => {
      this.spinnerService.hide();
    });
  }
}
