import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService, private router: Router) { }

  
  transForm: FormGroup;
  wait: boolean = false;
  bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.transForm = this.fb.group({
      title: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  addTrans(){
    this.wait = true;
    this.adminService.addTransaction(this.transForm.value).subscribe(res => {
      this.wait = false;
      this.toastr.success("Transaction added successfully");
      this.router.navigate(['/transaction']);
    },error => {
      this.toastr.error(error);
    })
  }
}
