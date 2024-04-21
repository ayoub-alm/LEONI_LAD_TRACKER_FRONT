import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerScanneComponent } from './picker-scanne.component';

describe('PickerScanneComponent', () => {
  let component: PickerScanneComponent;
  let fixture: ComponentFixture<PickerScanneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerScanneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickerScanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
