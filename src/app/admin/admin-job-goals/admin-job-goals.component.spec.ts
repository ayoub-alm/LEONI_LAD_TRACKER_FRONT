import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobGoalsComponent } from './admin-job-goals.component';

describe('AdminJobGoalsComponent', () => {
  let component: AdminJobGoalsComponent;
  let fixture: ComponentFixture<AdminJobGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobGoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminJobGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
