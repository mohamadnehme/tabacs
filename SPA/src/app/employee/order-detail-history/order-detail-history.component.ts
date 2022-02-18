import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-order-detail-history',
  templateUrl: './order-detail-history.component.html',
  styleUrls: ['./order-detail-history.component.css']
})
export class OrderDetailHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService, private Location: Location) { }

  orders: any[];
  order: any;
  total = 0;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orders = data['order'].orderDetails;
      this.order = data['order'].order;
      this.orders.forEach(element => {
        this.total += (element.price*element.quantity)
      });
    });
  }
  back(){
    this.Location.back();
  }
}
