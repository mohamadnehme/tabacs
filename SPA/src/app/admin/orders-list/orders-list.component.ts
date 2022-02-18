import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddOrderComponent } from 'src/app/employee/add-order/add-order.component';
import { DeleteCustomerComponent } from 'src/app/employee/delete-customer/delete-customer.component';
import { DeleteOrderConfirmComponent } from 'src/app/employee/delete-order-confirm/delete-order-confirm.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService,private toastr: ToastrService, private modalService: BsModalService) { }

  bsModalRef: BsModalRef;
  customers: any[]
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.customers = data['customers'].customers;
    });
  }
  openOrder(){
    this.bsModalRef = this.modalService.show(AddOrderComponent);
    this.bsModalRef.content.add.subscribe((res: any) => {
      this.customers.push(res);
    });
  }
  delete(id){
    const initialState = {
      id
    }
    this.bsModalRef = this.modalService.show(DeleteCustomerComponent, {initialState});
    this.bsModalRef.content.Delete.subscribe(res => {

      this.userService.deleteCustomer(id).subscribe((res: any) => {
      this.customers.forEach((element,index)=>{
        if(element.id==res.c.id) this.customers.splice(index,1);
      });
      this.toastr.success("deleted successfully");
      }, error => {
        this.toastr.error(error);
      })

    })
  }

}
