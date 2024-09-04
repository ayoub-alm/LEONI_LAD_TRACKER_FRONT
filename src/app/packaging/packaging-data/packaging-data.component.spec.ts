import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingDataComponent } from './packaging-data.component';

describe('PackagingDataComponent', () => {
  let component: PackagingDataComponent;
  let fixture: ComponentFixture<PackagingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
