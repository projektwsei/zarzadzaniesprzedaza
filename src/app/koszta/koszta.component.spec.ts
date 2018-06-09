import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KosztaComponent } from './koszta.component';

describe('KosztaComponent', () => {
  let component: KosztaComponent;
  let fixture: ComponentFixture<KosztaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KosztaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KosztaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
