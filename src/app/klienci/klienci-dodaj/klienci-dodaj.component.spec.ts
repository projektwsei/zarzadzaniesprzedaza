import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlienciDodajComponent } from './klienci-dodaj.component';

describe('KlienciDodajComponent', () => {
  let component: KlienciDodajComponent;
  let fixture: ComponentFixture<KlienciDodajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlienciDodajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlienciDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
