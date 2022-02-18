import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-tabac',
  templateUrl: './update-tabac.component.html',
  styleUrls: ['./update-tabac.component.css']
})
export class UpdateTabacComponent implements OnInit {

  tabacForm: FormGroup;
  wait: boolean = false;
  tabac: any;
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
      this.tabac = data['tabac'].tabac;
      this.back = this.tabac.categoryId == 1? "/Cigare": "/Cigarette";
      this.createTabacForm();
    });
    
  }

  createTabacForm(){
    this.tabacForm = this.fb.group({
      name: [this.tabac.name, Validators.required],
      description: [this.tabac.description, Validators.required],
      quantityPerTable: [this.tabac.quantityPerTable, Validators.required],
      priceInCfa: [this.tabac.priceInCfa, Validators.required]
    });
  }
  update(){
    this.wait = true;
    this.adminService.updateTabac(this.tabacForm.value,this.tabac.id,this.tabac.categoryId).subscribe(res => {
      let message = this.tabac.categoryId == 1? "cigare updated successfully": "cigarette updated successfully";
      this.tabacForm.reset();
      this.toastr.success(message);
      this.router.navigate([this.back]);
    }, error => {
      this.toastr.error(error);
    });
  }
}
