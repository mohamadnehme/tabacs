import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-deposit',
  templateUrl: './update-deposit.component.html',
  styleUrls: ['./update-deposit.component.css']
})
export class UpdateDepositComponent implements OnInit {

  @Output() updateDep = new EventEmitter();

  res:any={
    coins : '',
    operation: 0
  };

  id;
  operation;
  constructor(public bsModalRef: BsModalRef, private adminService: AdminService) {}

  ngOnInit() { }

  updateDeposit(){
    
    this.res.operation = this.operation;
    this.adminService.updateDeposit(this.id, this.res).subscribe((res: any) => {
      this.updateDep.emit(res.d);
      this.bsModalRef.hide();
    });
    
  }
}
