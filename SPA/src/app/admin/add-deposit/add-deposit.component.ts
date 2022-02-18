import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-deposit',
  templateUrl: './add-deposit.component.html',
  styleUrls: ['./add-deposit.component.css']
})
export class AddDepositComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService, private router: Router) { }

  depFrom: FormGroup;
  user: any;
  wait: boolean = false;

  ngOnInit(){
    this.createdepForm();
  }

  createdepForm(){
    this.depFrom = this.fb.group({
      name: ['', Validators.required],
      coins: ['', [Validators.required, Validators.min(0)]],
    });
  }

  adddep(){
    this.wait = true;
    this.adminService.addDepositor(this.depFrom.value).subscribe(res => {
      this.toastr.success("depositor added");
      this.wait = false;
      this.router.navigate(['/depositorList']);
    },error => {
      this.toastr.error("failed to added");
      this.wait = false;
      this.router.navigate(['/depositorList']);
    })
  }
}
