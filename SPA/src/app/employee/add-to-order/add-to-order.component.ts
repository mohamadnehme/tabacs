import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.css']
})
export class AddToOrderComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService,private toastr: ToastrService, private router:Router,  private _location: Location) { }

  customer: any;
  tabacs: any[];
  ids:any[] = [];
  total = 0;
  wait: boolean = false;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.customer = data['c'].c;
    });
    this.userService.getTabacsList().subscribe((res:any) => {
      this.tabacs = res.t;
    })
  }

  test(event,tabac){
    if(event.target.checked){
      tabac.ischecked = true;
      this.ids.push(tabac);
    }
    else{
      const index = this.ids.indexOf(tabac);
       this.ids.splice(index,1);
       tabac.ischecked = false;
    }
    this.Total();
  }
  Total(){
    this.total = 0;
    this.ids.forEach(element => {
      this.total += (element.priceInCfa*element.quantityPerTable);
    });
  }
  save(){
    let exit = 0
    this.wait = true;
    this.ids.forEach(element => {
      if(element.quantityPerTable == 0){
        this.toastr.error("quantity must be greater than 0");
        exit = 1;
        this.wait = false;
      }
    });
    if(exit == 1){
      this.wait = false;
      return;
    }
    if(this.ids.length > 0){

      this.userService.addToOrder(this.ids, this.customer.id, this.total).subscribe((res:any)=>{
        this.toastr.success("saved successfully");
        this.router.navigate(['/CustomerDetail',this.customer.id]);
      },error => {
        this.toastr.error(error);
        this.wait = false;
      });

    }
      else {
        this.wait = false;
        this.toastr.error("Please select merchandise");
      }
  }
  back(){
    this._location.back();
  }
}
