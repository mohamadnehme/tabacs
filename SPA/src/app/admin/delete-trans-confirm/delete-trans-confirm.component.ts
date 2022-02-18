import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-trans-confirm',
  templateUrl: './delete-trans-confirm.component.html',
  styleUrls: ['./delete-trans-confirm.component.css']
})
export class DeleteTransConfirmComponent implements OnInit {

  @Output() Delete = new EventEmitter();
  id;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  deleteT(){
    this.Delete.emit();
    this.bsModalRef.hide();
  }
}
