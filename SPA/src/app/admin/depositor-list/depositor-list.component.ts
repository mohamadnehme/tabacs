import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UpdateDepositComponent } from '../update-deposit/update-deposit.component';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './depositor-list.component.html',
  styleUrls: ['./depositor-list.component.css']
})
export class DepositorListComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService,private toastr: ToastrService, private modalService: BsModalService) { }

  bsModalRef: BsModalRef;
  dep: any[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dep = data['dep'].d;
    });
  }

  updateDep(id, op){
    const initialState = {
      id: id,
      operation: op
    }
    this.bsModalRef = this.modalService.show(UpdateDepositComponent, {initialState});
    this.bsModalRef.content.updateDep.subscribe((res: any) => {
      this.dep.forEach((element,index)=>{
        if(element.id == res.id) 
          this.dep[index] = res;  
       }); 
    })
  }
}