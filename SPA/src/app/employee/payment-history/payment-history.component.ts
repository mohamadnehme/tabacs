import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

  payments;
  cName;
  total = 0;
  constructor(private route:ActivatedRoute, private userService: UserService, private _location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.payments = data['payments'].p;
      this.cName = data['payments'].cName;
      this.payments.forEach(element => {
        this.total += (element.price)
      });
    });
  }

  back(){
    this._location.back();
  }
}
