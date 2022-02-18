import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  changeForm: FormGroup;
  userEmail: any;
  id: any;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.userEmail = data['user'].email;
      this.id = data['user'].id;
    });
    this.createChangeForm();
  }

  createChangeForm(){
    this.changeForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  changePassword(){
    this.userService.changePassword(this.id,this.changeForm.value.password).subscribe(res => {
      this.toastr.success("Password updated")
      this.router.navigate(['/login']);
    },error=>{
      this.toastr.error("Updated failed");
    });
  }
}
