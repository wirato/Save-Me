import { Component, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css'],
})
export class StockHomeComponent implements OnInit {
  displayedColumns = ['image', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<Product>();
  textSearch: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  uploadPercentage$: Observable<number>; // wirato
  files$: Observable<File[]>; // wirato

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.feedData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.files$ = this.firestore.collection<File>('files').valueChanges(); // wirato
  }
  // wirato ##########################################################################
  onFileUpload(files: FileList) {
    const file = files[0]; // get single file
    console.log(files);
    const path = `files/${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    this.uploadPercentage$ = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then(url => {
          const file_: File = { name: file.name, url }
          this.firestore.collection('files').add(file_);
        })
      })
    ).subscribe();
  }
  // wirato ##########################################################################

  feedData() {
    const dummy: Product[] = [
      {
        name: 'repudiandae suscipit est.Omnis vel optio',
        stock: 1,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 279,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 321,
        price: 422900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 423,
        price: 429550,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 555,
        price: 429070,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'repudiandae suscipit est.Omnis vel optio',
        stock: 1,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 279,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 321,
        price: 422900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 423,
        price: 429550,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 555,
        price: 429070,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'repudiandae suscipit est.Omnis vel optio',
        stock: 1,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 279,
        price: 42900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 321,
        price: 422900,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 423,
        price: 429550,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
      {
        name: 'Macbook pro',
        stock: 555,
        price: 429070,
        image:
          'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_TH?wid=892&hei=820&&qlt=80&.v=1587460269141',
      },
    ];
    this.dataSource.data = dummy;
  }
  search(event: KeyboardEvent) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = fliterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }
}
