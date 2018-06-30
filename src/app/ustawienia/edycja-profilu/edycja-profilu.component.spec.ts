import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdycjaProfiluComponent } from './edycja-profilu.component';

describe('EdycjaProfiluComponent', () => {
  let component: EdycjaProfiluComponent;
  let fixture: ComponentFixture<EdycjaProfiluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdycjaProfiluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdycjaProfiluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
