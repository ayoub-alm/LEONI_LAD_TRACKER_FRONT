import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerStartComponent } from './picker-start.component';

describe('PickerStartComponent', () => {
  let component: PickerStartComponent;
  let fixture: ComponentFixture<PickerStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickerStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
