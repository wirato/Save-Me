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
import { Files } from 'src/app/models/files';


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

  files_: Files[];

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.files$ = this.firestore.collection<File>('files').valueChanges(); // wirato

    this.firestore.collection('files').snapshotChanges().subscribe(data => {
      this.files_ = data.map(e => {
        return {
          name: e.payload.doc.get('name'),
          url: e.payload.doc.get('url'),
          id: e.payload.doc.id,
        } as Files;
      })
    });
  }
 
  onFileUpload(files: FileList) {
    const file = files[0];
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

  delete(id: string, name: string) {
    this.firestore.doc('files/' + id).delete();
    this.storage.storage.ref('files/'+ name).delete()
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
