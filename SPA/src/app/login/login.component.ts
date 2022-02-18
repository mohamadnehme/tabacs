import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private route: Router, private adminService:AdminService) { }

  loginForm: FormGroup;
  user: any;
  wait: boolean = false;
  show: boolean = false;
  
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
  }
  login(){
    this.wait = true;
    this.authService.login(this.loginForm.value).subscribe(next => {
      this.toastr.success("logged in successfully");
      this.wait = false;
    },error => {
      this.toastr.error(error);
      this.wait = false;
    },() => {
      if(this.authService.decodeToken.role == 'employee')
        this.route.navigate(['/Order']);
      if(this.authService.decodeToken.role == 'admin')
        this.route.navigate(['/depositorList']);
    });
  }
  hide(){
    this.show = false;
  }
}
