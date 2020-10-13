import { Component, OnDestroy,ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { Event } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { AngularFirestore } from '@angular/fire/firestore'; // wirato
import { AngularFireStorage } from '@angular/fire/storage'; // wirato
import { Observable } from 'rxjs'; // wirato
import { finalize } from 'rxjs/operators'; // wirato
import { File } from 'src/app/models/file'; // wirato
import { Files } from 'src/app/models/files';


@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css'],
})
export class StockHomeComponent implements OnDestroy {
  mobileQueryMax: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryMax = media.matchMedia('(max-width:600px)');
    this.mobileQueryMax.addListener(this._mobileQueryListener);
  }

  ngOnDestroy():void{
    this.mobileQueryMax.removeListener(this._mobileQueryListener)
  }
}
