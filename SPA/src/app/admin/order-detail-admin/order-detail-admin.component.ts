import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrls: ['./order-detail-admin.component.css']
})
export class OrderDetailAdminComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService, private toastr: ToastrService,  private router: Router) { }

  orderDetails: any[];
  total = 0;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orderDetails = data['order'].orderDetails;
      this.orderDetails.forEach(element => {
        this.total += (element.price*element.quantity)
      });
    });
  }
  
  delete(id){
    this.userService.deleteDetailOrder(id).subscribe((res:any) => {
      this.orderDetails.forEach((element,index)=>{
        if(element.id==res.o.id) this.orderDetails.splice(index,1);
     });  
      this.toastr.success("deleted successfully");
    }, error => {
      this.toastr.error(error);
    });
  }
}
