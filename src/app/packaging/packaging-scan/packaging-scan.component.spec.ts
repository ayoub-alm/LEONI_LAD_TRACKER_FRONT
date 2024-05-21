import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingScanComponent } from './packaging-scan.component';

describe('PackagingScanComponent', () => {
  let component: PackagingScanComponent;
  let fixture: ComponentFixture<PackagingScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingScanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
