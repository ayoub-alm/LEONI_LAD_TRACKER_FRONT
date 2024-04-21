import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerIndexComponent } from './picker-index.component';

describe('PickerIndexComponent', () => {
  let component: PickerIndexComponent;
  let fixture: ComponentFixture<PickerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
