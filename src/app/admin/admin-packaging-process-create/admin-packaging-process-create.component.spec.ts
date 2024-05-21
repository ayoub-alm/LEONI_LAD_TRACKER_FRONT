import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackagingProcessCreateComponent } from './admin-packaging-process-create.component';

describe('AdminPackagingProcessCreateComponent', () => {
  let component: AdminPackagingProcessCreateComponent;
  let fixture: ComponentFixture<AdminPackagingProcessCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPackagingProcessCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPackagingProcessCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
