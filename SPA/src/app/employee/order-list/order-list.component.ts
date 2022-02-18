import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AddOrderComponent } from '../add-order/add-order.component';
import { DeleteOrderConfirmComponent } from '../delete-order-confirm/delete-order-confirm.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService,private toastr: ToastrService) { }

  customers: any[]
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.customers = data['customers'].customers;
    });
  }
}
