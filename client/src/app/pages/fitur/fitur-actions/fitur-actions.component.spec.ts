import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiturActionsComponent } from './fitur-actions.component';

describe('FiturActionsComponent', () => {
  let component: FiturActionsComponent;
  let fixture: ComponentFixture<FiturActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiturActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiturActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
