import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.css']
})
export class DepositListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  deposit: any[];
  name;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.deposit = data['d'].d;
      if(this.deposit)
        this.name = this.deposit[0].depositor.name;
    });
  }
}