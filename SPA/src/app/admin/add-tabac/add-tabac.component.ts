import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-tabac',
  templateUrl: './add-tabac.component.html',
  styleUrls: ['./add-tabac.component.css']
})
export class AddTabacComponent implements OnInit {

  tabacForm: FormGroup;
  wait: boolean = false;
  c;
  back: any;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotificarion($event: any){
    if(this.tabacForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.c = data['category'];
      this.back = this.c == 1? "/Cigare": "/Cigarette";
    });
    this.createTabacForm();
  }

  createTabacForm(){
    this.tabacForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantityPerTable: ['', [Validators.required, Validators.min(0)]],
      priceInCfa: ['', [Validators.required, Validators.min(0)]]
    });
  }
  add(){
    this.wait = true;
    this.adminService.addTabac(this.tabacForm.value,this.c).subscribe(res => {
      this.wait = false;
      let message = this.c == 1? "cigare added successfully": "cigarette added successfully";
      this.tabacForm.reset();
      this.toastr.success(message);
      this.router.navigate([this.back]);
    }, error => {
      this.toastr.error(error);
      this.wait = false;
    });
  }
}
