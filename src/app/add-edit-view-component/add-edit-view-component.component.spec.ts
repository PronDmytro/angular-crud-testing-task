import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewComponentComponent } from './add-edit-view-component.component';

describe('AddEditViewComponentComponent', () => {
  let component: AddEditViewComponentComponent;
  let fixture: ComponentFixture<AddEditViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditViewComponentComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
