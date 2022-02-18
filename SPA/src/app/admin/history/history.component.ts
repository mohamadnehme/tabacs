import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService: AdminService) { }

  trans: any[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.trans = data['trans'].t;
    });
  }
}
