import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GetOrderDetailHistoryResolver implements Resolve<boolean> {
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getOrderDetailHistory(route.params['id']).pipe(
      catchError(error => {       
          console.log('server error');
          this.router.navigate(['/home']);
          return of(null);
      })
    );
  }
}
