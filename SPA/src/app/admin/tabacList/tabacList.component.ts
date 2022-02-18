import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-tabacList',
  templateUrl: './tabacList.component.html',
  styleUrls: ['./tabacList.component.css']
})
export class TabacListComponent implements OnInit {
  @Input() tabacs;
  value;
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) { } 

  ngOnInit() {
    this.adminService.valueCfa.subscribe(res => {
      this.value = res;
    });
  }

  delete(id){
    const initialState = {
      id
    }
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {initialState});

    this.bsModalRef.content.Delete.subscribe(() => {
      this.adminService.deleteTabac(id).subscribe((res:any) => {
        this.tabacs.forEach((element,index)=>{
          if(element.id==res.tabac.id) this.tabacs.splice(index,1);
       });  
        this.toastr.success("deleted successfully");
      }, error => {
        this.toastr.error(error);
      });
    });
  }
}
