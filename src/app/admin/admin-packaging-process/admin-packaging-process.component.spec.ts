import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackagingProcessComponent } from './admin-packaging-process.component';

describe('AdminPackagingProcessComponent', () => {
  let component: AdminPackagingProcessComponent;
  let fixture: ComponentFixture<AdminPackagingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPackagingProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPackagingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
