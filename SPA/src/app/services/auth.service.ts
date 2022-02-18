import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  baseUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) { }
  register(user: any){
    return this.http.post(this.baseUrl + 'register',user);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(model: any){
    return this.http.post(this.baseUrl + 'login',model).pipe(
      map((respone:any) => {
        const user = respone;
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.userToReturn));
          this.currentUser = user.userToReturn;
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  test(){
    return this.http.get(environment.apiUrl + 'home/test');
  }

  roleMatch(allowedRoles): boolean{
    let isMatch = false;
    const userRoles = this.decodeToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if(userRoles.includes(element)){
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
  
  isEmailExist(email: string){
    return this.http.get(this.baseUrl + 'isExist?email=' + email);
  }
}
