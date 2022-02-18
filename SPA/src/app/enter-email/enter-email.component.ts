import { Component, EventEmitter, NgModule, NO_ERRORS_SCHEMA, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private userService: UserService) { }

  @Output() hide = new EventEmitter();

  ngOnInit(): void {
    this.createRegisterForm();
  }
  wait: boolean = false;
  emailForm: FormGroup;
  send: boolean = false;
  createRegisterForm(){
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isEmailExist(){   
    this.wait = true;
    this.authService.isEmailExist(this.emailForm.value.email).subscribe(res=>{
      if(res === true){
        this.userService.sendEmail(this.emailForm.value.email).subscribe(r =>{
          this.wait = false;
          this.send = true;
        },error => {
          this.toastr.error("Email not sended");
          this.wait = false;
        })
      }
      else{
        this.toastr.error("Email not Exist");
        this.wait = false;
      }
    }, error => {
      this.toastr.error(error);
      this.wait = false;
    })
  }

  hideForm(){
    this.hide.emit();
  }
}
