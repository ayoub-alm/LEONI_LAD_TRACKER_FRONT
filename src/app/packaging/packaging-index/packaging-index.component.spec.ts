import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingIndexComponent } from './packaging-index.component';

describe('PackagingIndexComponent', () => {
  let component: PackagingIndexComponent;
  let fixture: ComponentFixture<PackagingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
