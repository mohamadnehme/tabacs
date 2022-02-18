import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail-history',
  templateUrl: './customer-detail-history.component.html',
  styleUrls: ['./customer-detail-history.component.css']
})
export class CustomerDetailHistoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router) { }

  orders: any[];
  name;
  id;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orders = data['orders'].orders;
      this.name = data['orders'].c.name;
      this.id = data['orders'].c.id;
    });
  }
  back(){
    this.router.navigate(['/OrderHistory']);
  }
}
