import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  @Output() Delete = new EventEmitter();
  id;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  deleteT(){
    this.Delete.emit();
    this.bsModalRef.hide();
  }
}
