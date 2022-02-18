import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-tabac',
  templateUrl: './detail-tabac.component.html',
  styleUrls: ['./detail-tabac.component.css']
})
export class DetailTabacComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  tabac: any;
  back: any;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tabac = data['tabac'].tabac;
      this.back = this.tabac.categoryId == 1? "/Cigare": "/Cigarette";
    });
  }
}
