import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdiagComponent } from './orderdiag.component';

describe('OrderdiagComponent', () => {
  let component: OrderdiagComponent;
  let fixture: ComponentFixture<OrderdiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
