import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFiturComponent } from './preview-fitur.component';

describe('PreviewFiturComponent', () => {
  let component: PreviewFiturComponent;
  let fixture: ComponentFixture<PreviewFiturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFiturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
