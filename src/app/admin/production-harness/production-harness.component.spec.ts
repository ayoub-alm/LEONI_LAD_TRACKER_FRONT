import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionHarnessComponent } from './production-harness.component';

describe('ProductionHarnessComponent', () => {
  let component: ProductionHarnessComponent;
  let fixture: ComponentFixture<ProductionHarnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionHarnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionHarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
