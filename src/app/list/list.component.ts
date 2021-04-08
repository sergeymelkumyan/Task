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

  rowValue = 0;
  dataSource: any;
  displayedColumns: string[] = ['position', 'name'];
  filteredValue: any;
  types: any;
  subscription!: Subscription;
  tab!: number;

  constructor(private shared: SharedService,
              private router: Router,
              private route: ActivatedRoute) {}

  fetchRowData(val: any): any {
    // this.rowValue = val;
    this.shared.listDataFunc(val);
  }

  fetchSummaryData(): any {
    this.shared.listDataFunc(this.rowValue);
  }

  fetchAllRowsData(): any {
    this.router.navigate(['navigator']);
    this.shared.listDataFunc(4);
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(
      params => {
        this.tab =  params.tab;
      }
    );
    this.shared.getRowData().subscribe((arr: any) => {
      if (arr) {
        this.dataSource = arr[1];
        this.rowValue = arr[0];
      }
    });
    this.types = this.shared.types;
  }
}
