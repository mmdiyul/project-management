import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiturComponent } from './fitur.component';

describe('FiturComponent', () => {
  let component: FiturComponent;
  let fixture: ComponentFixture<FiturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
