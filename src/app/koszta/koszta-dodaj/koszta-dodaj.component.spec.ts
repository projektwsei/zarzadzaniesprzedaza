import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KosztaDodajComponent } from './koszta-dodaj.component';

describe('KosztaDodajComponent', () => {
  let component: KosztaDodajComponent;
  let fixture: ComponentFixture<KosztaDodajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KosztaDodajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KosztaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
