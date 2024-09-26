import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDisplayComponent } from './line-display.component';

describe('LineDisplayComponent', () => {
  let component: LineDisplayComponent;
  let fixture: ComponentFixture<LineDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
