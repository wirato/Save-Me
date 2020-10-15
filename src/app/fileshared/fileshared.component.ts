import { Component, OnInit ,ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-fileshared',
  templateUrl: './fileshared.component.html',
  styleUrls: ['./fileshared.component.css']
})
export class FilesharedComponent implements OnDestroy {
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
