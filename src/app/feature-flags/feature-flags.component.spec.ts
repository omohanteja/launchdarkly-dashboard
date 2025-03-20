import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFlagsComponent } from './feature-flags.component';

describe('FeatureFlagsComponent', () => {
  let component: FeatureFlagsComponent;
  let fixture: ComponentFixture<FeatureFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureFlagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
