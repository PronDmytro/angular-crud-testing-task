import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnersTableComponent } from './car-owners-table.component';

describe('CarOwnersTableComponent', () => {
  let component: CarOwnersTableComponent;
  let fixture: ComponentFixture<CarOwnersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarOwnersTableComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOwnersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
