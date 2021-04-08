import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  dataSource: any;
  types: any;
  tab!: number;

  constructor(private shared: SharedService,
              private route: ActivatedRoute) {}

  fetchRowData(val: any): any {
    this.shared.listDataFunc(val);
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(
      params => {
        this.tab =  params.tab;
      }
    );
    this.shared.getRowData().subscribe((val: any) => {
      if (val) {
        this.dataSource = val;
      }
    });
    this.types = this.shared.types;
  }
}
