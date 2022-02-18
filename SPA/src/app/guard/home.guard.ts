import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router,private toastr:ToastrService){}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    
    if(this.auth.loggedIn()){
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
