import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.component.html',
  styleUrls: ['./detail-history.component.css']
})
export class DetailHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService, private toastr: ToastrService,  private router: Router) { }

  charges: any[];

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.charges = data['c'].charges;
    });
  }

}
