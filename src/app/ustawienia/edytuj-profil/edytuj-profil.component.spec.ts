import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdytujProfilComponent } from './edytuj-profil.component';

describe('EdytujProfilComponent', () => {
  let component: EdytujProfilComponent;
  let fixture: ComponentFixture<EdytujProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdytujProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdytujProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
