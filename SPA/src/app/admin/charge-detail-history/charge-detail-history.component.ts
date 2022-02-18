import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-charge-detail-history',
  templateUrl: './charge-detail-history.component.html',
  styleUrls: ['./charge-detail-history.component.css']
})
export class ChargeDetailHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService, private toastr: ToastrService,  private router: Router, private _location: Location) { }

  shipments: any[];
  cid;
  tid;
  total = 0;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.shipments = data['s'].s;
      this.cid = data['s'].cid;
      this.tid = data['s'].tid;
      this.shipments.forEach(element => {
        this.total += (element.price*element.quantity)
      });
    });
  }

  save(){
    this.adminService.checkShipment(this.cid,this.tid).subscribe((res: any) => {
      this.toastr.success("checked successfully");
      if(res.complete == 1){
        this.router.navigate(['/transaction']);
      }
      else
        this.router.navigate(['/TransactionDetail',this.tid]);
    }, error => {
      this.toastr.error("checked failed");
    })
  }

  back(){
    this._location.back();
  }

}
