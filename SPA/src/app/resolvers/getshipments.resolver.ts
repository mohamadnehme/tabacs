import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class GetshipmentsResolver implements Resolve<boolean> {

  constructor(private adminService: AdminService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.adminService.getShipments(route.params['id']).pipe(
      catchError(error => {       
          console.log('server error');
          this.router.navigate(['/home']);
          return of(null);
      })
    );
  }
}
