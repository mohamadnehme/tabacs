import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddTabacResolver implements Resolve<any> {

  constructor(private router: Router, private toastr: ToastrService){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let c = route.params['category'];

    if(Number(c) === 1 || Number(c) === 2){
      return c;
    }
    else{
      this.router.navigate(['/home']);
      return null;
    }
    
  }
}
