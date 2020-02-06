import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFiturComponent } from './detail-fitur.component';

describe('DetailFiturComponent', () => {
  let component: DetailFiturComponent;
  let fixture: ComponentFixture<DetailFiturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFiturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
