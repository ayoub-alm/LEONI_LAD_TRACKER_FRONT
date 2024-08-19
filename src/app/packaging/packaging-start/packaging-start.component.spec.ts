import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingStartComponent } from './packaging-start.component';

describe('PackagingStartComponent', () => {
  let component: PackagingStartComponent;
  let fixture: ComponentFixture<PackagingStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
