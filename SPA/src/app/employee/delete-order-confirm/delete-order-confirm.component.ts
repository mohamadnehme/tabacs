import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-order-confirm',
  templateUrl: './delete-order-confirm.component.html',
  styleUrls: ['./delete-order-confirm.component.css']
})
export class DeleteOrderConfirmComponent implements OnInit {

  @Output() Delete = new EventEmitter();
  id;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  deleteO(){
    this.Delete.emit();
    this.bsModalRef.hide();
  }
}
