import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesharedComponent } from './storageshared.component';

describe('StoragesharedComponent', () => {
  let component: StoragesharedComponent;
  let fixture: ComponentFixture<StoragesharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragesharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragesharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
