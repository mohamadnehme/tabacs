import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  @Output() Delete = new EventEmitter();
  id;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  deleteO(){
    this.Delete.emit();
    this.bsModalRef.hide();
  }
}
