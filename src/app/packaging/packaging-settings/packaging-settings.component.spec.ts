import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingSettingsComponent } from './packaging-settings.component';

describe('PackagingSettingsComponent', () => {
  let component: PackagingSettingsComponent;
  let fixture: ComponentFixture<PackagingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
