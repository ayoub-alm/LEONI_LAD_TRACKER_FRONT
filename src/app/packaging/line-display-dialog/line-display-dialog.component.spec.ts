import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDisplayDialogComponent } from './line-display-dialog.component';

describe('LineDisplayDialogComponent', () => {
  let component: LineDisplayDialogComponent;
  let fixture: ComponentFixture<LineDisplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineDisplayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
