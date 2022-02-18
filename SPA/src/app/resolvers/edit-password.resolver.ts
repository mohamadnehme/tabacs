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
export class EditPasswordResolver implements Resolve<any> {
  constructor(private userService: UserService, private router: Router){ }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getEmail(route.params['id']).pipe(
      catchError(error => {
          console.log('server error');
          this.router.navigate(['/home']);
          return of(null);
      })
  );
  }
}
