import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazynComponent } from './magazyn.component';

describe('MagazynComponent', () => {
  let component: MagazynComponent;
  let fixture: ComponentFixture<MagazynComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazynComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazynComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
