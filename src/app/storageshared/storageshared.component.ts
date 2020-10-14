import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { AngularFirestore } from '@angular/fire/firestore'; // wirato
import { AngularFireStorage } from '@angular/fire/storage'; // wirato
import { Observable } from 'rxjs'; // wirato
import { finalize } from 'rxjs/operators'; // wirato
import { File } from 'src/app/models/file'; // wirato
import { Files } from 'src/app/models/files';
import { AuthService } from "../shared/services/auth.service";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-storageshared',
  templateUrl: './storageshared.component.html',
  styleUrls: ['./storageshared.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class StoragesharedComponent implements OnInit {
  textSearch: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  uploadPercentage$: Observable<number>; // wirato
  files$: Observable<File[]>; // wirato

  files_: Files[];

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    public authService: AuthService,
    private modalService: NgbModal,
  ) {}


  ngOnInit(): void {

    this.files$ = this.firestore.collection<File>('files').valueChanges(); // wirato;

    this.firestore.collection('files').snapshotChanges().subscribe(data => {
      this.files_ = data.map(e => {

        return {
          name: e.payload.doc.get('name'),
          userID: e.payload.doc.get('userID'),
          url: e.payload.doc.get('url'),
          id: e.payload.doc.id,
          shared: e.payload.doc.get('shared'),
        } as Files;
      })
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openDelete(contentDelete) {
    this.modalService.open(contentDelete, { centered: true });
  }
 
  onFileUpload(files: FileList, ID: string, shared: string) {
    const file = files[0];
    const path = `files/${ID}/${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    this.uploadPercentage$ = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then(url => {
          const file_: File = { userID: ID , name: file.name, url, shared:[shared]}
          this.firestore.collection('files').add(file_);
        })
      })
    ).subscribe();
  }

  delete(id: string, name: string, userid: string) {
    this.firestore.doc('files/'+ id).delete();
    this.storage.storage.ref('files/'+userid+'/'+ name).delete()
  }

  update(id: string,email: string, shared: string[]){
    console.log(shared)
    shared.push(email);
    console.log(shared)
    this.firestore.collection("files").doc(id).update({ shared: shared});
  }

  search(event: KeyboardEvent) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }
}
