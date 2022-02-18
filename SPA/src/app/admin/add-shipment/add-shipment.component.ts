import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService, private toastr: ToastrService, private router: Router) { }
  name;
  total = 0;
  tabacs: any[];
  trans: any;
  ids:any[] = [];
  wait: boolean = false;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.trans = data['trans'].t;
    });
    this.adminService.getTabacsList().subscribe((res:any) => {
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
       console.log(index);
       tabac.ischecked = false;
    }
    this.Total();
  }
  save(){
    let exit = 0;
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

      this.adminService.addShipments(this.ids, this.trans.id, this.name, this.total).subscribe((res:any)=>{
      this.toastr.success("saved successfully");
      this.router.navigate(['/transaction']);
      this.wait = false;
      },error => {
        this.wait = false;
        this.toastr.error("failed to save");
      });
      
    }
    else{
      this.wait = false;
      this.toastr.error("Please select merchandise");
    }
    
  }

  Total(){
    this.total = 0;
    this.ids.forEach(element => {
      this.total += (element.priceInCfa*element.quantityPerTable);
    });
  }
}
