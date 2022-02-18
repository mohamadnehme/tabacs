import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Location } from "@angular/common"
import { DeleteOrderConfirmComponent } from 'src/app/employee/delete-order-confirm/delete-order-confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {


  constructor(private authService: AuthService, private route:ActivatedRoute, private userService: UserService, private toastr: ToastrService,  private router: Router, private Location: Location, private modalService: BsModalService) { }

  orders: any[];
  name;
  id;
  bsModalRef: BsModalRef;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orders = data['orders'].orders;
      this.name = data['orders'].c.name;
      this.id = data['orders'].c.id;
    });
  }
  back(){
    if(this.authService.decodeToken.role == 'employee')
        this.router.navigate(['/Order']);
      if(this.authService.decodeToken.role == 'admin')
        this.router.navigate(['/OrderAdmin']);
  }
    delete(id){
    const initialState = {
      id
    }
    this.bsModalRef = this.modalService.show(DeleteOrderConfirmComponent, {initialState});
    this.bsModalRef.content.Delete.subscribe(res => {

      this.userService.deleteOrder(id).subscribe((res: any) => {
      this.orders.forEach((element,index)=>{
        if(element.id==res.o.id) this.orders.splice(index,1);
      });
      this.toastr.success("deleted successfully");
      }, error => {
        this.toastr.error(error);
      })

    })
  }
}
