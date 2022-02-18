import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { DeleteTransConfirmComponent } from '../delete-trans-confirm/delete-trans-confirm.component';

@Component({
  selector: 'app-transactionList',
  templateUrl: './transactionList.component.html',
  styleUrls: ['./transactionList.component.css']
})
export class TransactionListComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService,private toastr: ToastrService, private modalService: BsModalService) { }

  trans: any[];
  bsModalRef: BsModalRef;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.trans = data['trans'].t;
    });
  }
  delete(id){
    const initialState = {
      id
    }
    this.bsModalRef = this.modalService.show(DeleteTransConfirmComponent, {initialState});

    this.bsModalRef.content.Delete.subscribe(res => {

      this.adminService.deleteTrans(id).subscribe((t:any) => {
      this.trans.forEach((element,index)=>{
        if(element.id==t.t.id) this.trans.splice(index,1);
      });
      this.toastr.success("deleted successfully");
      }, error => {
        this.toastr.error(error);
      })
      
    })
  }
}
