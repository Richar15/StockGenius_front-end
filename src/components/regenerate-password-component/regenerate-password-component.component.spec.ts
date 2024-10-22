import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegeneratePasswordComponentComponent } from './regenerate-password-component.component';

describe('RegeneratePasswordComponentComponent', () => {
  let component: RegeneratePasswordComponentComponent;
  let fixture: ComponentFixture<RegeneratePasswordComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegeneratePasswordComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegeneratePasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
