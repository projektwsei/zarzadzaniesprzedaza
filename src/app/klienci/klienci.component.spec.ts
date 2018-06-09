import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlienciComponent } from './klienci.component';

describe('KlienciComponent', () => {
  let component: KlienciComponent;
  let fixture: ComponentFixture<KlienciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlienciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlienciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
