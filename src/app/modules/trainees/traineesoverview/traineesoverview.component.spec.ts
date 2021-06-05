import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesoverviewComponent } from './traineesoverview.component';

describe('TraineesoverviewComponent', () => {
  let component: TraineesoverviewComponent;
  let fixture: ComponentFixture<TraineesoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineesoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
