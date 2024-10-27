import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucomComponent } from './menucom.component';

describe('MenucomComponent', () => {
  let component: MenucomComponent;
  let fixture: ComponentFixture<MenucomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenucomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenucomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
