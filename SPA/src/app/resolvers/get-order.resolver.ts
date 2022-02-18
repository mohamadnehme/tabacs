import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GetOrderResolver implements Resolve<boolean> {
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getCustomer(route.params['id']).pipe(
      catchError(error => {       
          this.toastr.error('server error');
          this.router.navigate(['/home']);
          return of(null);
      })
    );
  }
}
