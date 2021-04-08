import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  sum!: number;
  types: any;
  id!: number;
  subscription!: Subscription;
  dataSource: any;

  constructor(private router: Router,
              private shared: SharedService) { }

  ngOnInit(): void {
    this.typesLength();
    this.sum = this.shared.types.reduce((tot, arr) => {
      return tot + arr.count;
    }, 0);
    this.types = this.shared.types;
    this.subscription = this.shared.getRowData().subscribe((data: any) => {
      this.dataSource = data[1];
    });
  }

  fetchRowData(rowVal: any): any {
    this.shared.listDataFunc(rowVal);
  }

  allTransactions(): any {
    this.router.navigate(['navigator']);
    this.shared.listDataFunc(4);
  }

  typesLength(): any {
    this.shared.types.forEach(oneType => {
      oneType.count = this.shared.ELEMENT_DATA.filter(e =>
        e.type === oneType.name).length;
    });
  }

}
