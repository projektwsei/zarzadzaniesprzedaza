import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktywacjaRejestracjiComponent } from './aktywacja-rejestracji.component';

describe('AktywacjaRejestracjiComponent', () => {
  let component: AktywacjaRejestracjiComponent;
  let fixture: ComponentFixture<AktywacjaRejestracjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktywacjaRejestracjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktywacjaRejestracjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
