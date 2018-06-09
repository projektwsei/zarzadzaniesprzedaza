import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazynDodajComponent } from './magazyn-dodaj.component';

describe('MagazynDodajComponent', () => {
  let component: MagazynDodajComponent;
  let fixture: ComponentFixture<MagazynDodajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazynDodajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazynDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
