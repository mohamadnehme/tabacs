import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService, private toastr: ToastrService,  private router: Router, private _location: Location, private authService:AuthService) { }

  orderDetails: any[];
  orderId;
  orderPayed = false;
  total = 0;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orderDetails = data['order'].orderDetails;
      this.orderId = data['order'].order.id;
      this.orderPayed = data['order'].order.isPayed;
      this.orderDetails.forEach(element => {
        this.total += (element.price*element.quantity)
      });
    });
  }
  save(){
    this.userService.checkOrder(this.orderId, this.orderDetails).subscribe(res => {
      this.toastr.success("arrived successfully");
      if(this.authService.decodeToken.role == 'employee')
        this.router.navigate(['/Order']);
      if(this.authService.decodeToken.role == 'admin')
        this.router.navigate(['/OrderAdmin']);
    }, error => {
      this.toastr.error("arrived failed");
    })
  }
  back(){
    this._location.back();
  }
}
