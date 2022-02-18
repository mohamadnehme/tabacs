import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private route:ActivatedRoute, private userService: UserService,private toastr: ToastrService, public bsModalRef: BsModalRef) { }
  @Output() add = new EventEmitter();
  name;

  ngOnInit() { }

  addCustomer(){
    this.userService.addCustomer(this.name).subscribe((res:any) => {
      this.add.emit(res.c);
      this.bsModalRef.hide();
    });
  }
}
