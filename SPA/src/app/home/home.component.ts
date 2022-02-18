import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
  if(this.authService.decodeToken.role == 'employee')
    this.route.navigate(['/Order']);
  if(this.authService.decodeToken.role == 'admin')
    this.route.navigate(['/depositorList']);
  }
}
