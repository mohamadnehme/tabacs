import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  registerForm: FormGroup;
  user: any;
  wait: boolean = false;

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  register(){
    this.wait = true;
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.wait = false;
        this.toastr.success("registration successed",'title');
      }, error => {
        if(error[0].description)
          this.toastr.error(error[0].description);
        else
          this.toastr.error(error);
        console.log(error);
        
        this.wait = false;
      }, () => {
        this.authService.login(this.user).subscribe(e=>{
          this.router.navigate(['/home']);
        });
      });
    }
  }

}
