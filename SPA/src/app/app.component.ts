import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/User';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'hadi';

  constructor(private authService: AuthService, private adminService: AdminService){ }

  jwtHelper = new JwtHelperService();

  ngOnInit(){
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    this.adminService.getValue().subscribe((res: any) => {
      this.adminService.setCfa(res.v.cfa);  
    })
    
    if(token){
      this.authService.decodeToken = this.jwtHelper.decodeToken(token);
    }
    if(user){
      this.authService.currentUser = user;
    }
  }
}
