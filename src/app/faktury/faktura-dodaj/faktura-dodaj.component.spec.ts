import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaDodajComponent } from './faktura-dodaj.component';

describe('FakturaDodajComponent', () => {
  let component: FakturaDodajComponent;
  let fixture: ComponentFixture<FakturaDodajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaDodajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
