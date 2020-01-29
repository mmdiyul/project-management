import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFiturComponent } from './list-fitur.component';

describe('ListFiturComponent', () => {
  let component: ListFiturComponent;
  let fixture: ComponentFixture<ListFiturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFiturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
