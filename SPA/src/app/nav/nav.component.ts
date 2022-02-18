import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(public authService: AuthService,private toastr:ToastrService,private route:Router, private adminService: AdminService) { }
  cfa;
  ngOnInit(): void {
  }

  loggedIn(){
    return this.authService.loggedIn();
  }
  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken = null;
    this.authService.currentUser = null;
    this.toastr.success('logged out');
    this.route.navigate(['/home']);
  }
  setCfa(){
   this.adminService.setCfa(this.cfa).subscribe((res: any) => {
     this.adminService.value.next(res.cfa);
     
     this.toastr.success("update cfa successfully");
   },error => {
     this.toastr.error("failed to update cfa");
   })
 }
}
