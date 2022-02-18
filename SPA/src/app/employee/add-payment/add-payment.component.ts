import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService,private toastr: ToastrService, private router:Router, private Location: Location, private authService: AuthService) { }

  user: any;
  wait: boolean = false;
  coin = 0;
  order;
  customer;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.order = data['order'].order;
      this.customer = data['order'].c;
    });
  }
  addPayment(){
    this.wait = true;
    if(this.coin > this.order.remainingPrice){
      this.toastr.error("the payment is more than the remaining");
      this.wait = false;
    }
    else{
      this.adminService.addPayment(this.coin,this.order.id).subscribe(res => {
      this.toastr.success("payment added");
      this.wait = false;
      if(this.authService.decodeToken.role == 'employee')
        this.router.navigate(['/Order']);
      if(this.authService.decodeToken.role == 'admin')
        this.router.navigate(['/CustomerDetail',this.customer.id]);
      },error => {
        this.toastr.error("failed to added");
        this.wait = false;
        this.router.navigate(['/Home']);
      })
    }
  }

  back(){
    this.Location.back();
  }
}
