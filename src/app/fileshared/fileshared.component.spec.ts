import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesharedComponent } from './fileshared.component';

describe('FilesharedComponent', () => {
  let component: FilesharedComponent;
  let fixture: ComponentFixture<FilesharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
