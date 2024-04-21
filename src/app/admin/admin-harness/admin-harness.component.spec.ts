import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHarnessComponent } from './admin-harness.component';

describe('AdminHarnessComponent', () => {
  let component: AdminHarnessComponent;
  let fixture: ComponentFixture<AdminHarnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHarnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminHarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
