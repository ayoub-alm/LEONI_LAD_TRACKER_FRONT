import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminObjectiveDialogComponent } from './admin-objective-dialog.component';

describe('AdminObjectiveDialogComponent', () => {
  let component: AdminObjectiveDialogComponent;
  let fixture: ComponentFixture<AdminObjectiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminObjectiveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminObjectiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
