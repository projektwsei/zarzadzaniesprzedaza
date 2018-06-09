import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturyComponent } from './faktury.component';

describe('FakturyComponent', () => {
  let component: FakturyComponent;
  let fixture: ComponentFixture<FakturyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
