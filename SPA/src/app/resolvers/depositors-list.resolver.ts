import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DepositorsListResolver implements Resolve<boolean> {
  constructor(private adminService: AdminService, private router: Router, private toastr: ToastrService){ }
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.adminService.getDepositors().pipe(
      catchError(error => {
          this.toastr.error('server error');
          this.router.navigate(['/home']);
          return of(null);
      })
  );
  }
}
