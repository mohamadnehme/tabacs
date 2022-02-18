import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router,private toastr:ToastrService){}
  canActivate(next: ActivatedRouteSnapshot): boolean {

    const roles = next.firstChild.data['roles'] as Array<string>;
    
    if(this.auth.loggedIn()){
      
      
      if(roles){
      const match = this.auth.roleMatch(roles);
      if(match){
        return true;
      }
      else{
        this.router.navigate(['/home']);
        this.toastr.error('You are not authorized to access this area');
      }
    }
      return true;
    }
    this.router.navigate(['/login']);
    this.toastr.error("you shall not pass!!!");
    
    return false;
  }
}
