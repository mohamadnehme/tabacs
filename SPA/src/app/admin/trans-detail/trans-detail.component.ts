import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-trans-detail',
  templateUrl: './trans-detail.component.html',
  styleUrls: ['./trans-detail.component.css']
})
export class TransDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService, private toastr: ToastrService,  private router: Router) { }

  charges: any[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.charges = data['c'].charges;
    });
  }

  test(event,s){
    if(event.target.checked){
      s.isComplete = true;
    }
    else{
       s.isComplete = false;
    }
  }
  
  delete(c){
    this.adminService.deleteCharge(c).subscribe((res:any) => {
      this.charges.forEach((element,index)=>{
        if(element.id==res.c.id) this.charges.splice(index,1);
     });  
      this.toastr.success("deleted successfully");
    }, error => {
      this.toastr.error(error);
    });
  }
}
