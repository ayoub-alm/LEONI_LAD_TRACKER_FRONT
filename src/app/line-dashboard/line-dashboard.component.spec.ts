import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDashboardComponent } from './line-dashboard.component';

describe('LineDashboardComponent', () => {
  let component: LineDashboardComponent;
  let fixture: ComponentFixture<LineDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
