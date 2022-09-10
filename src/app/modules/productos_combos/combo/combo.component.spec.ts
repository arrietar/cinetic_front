import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboComponent } from './combo.component';

describe('ComboComponent', () => {
  let component: ComboComponent;
  let fixture: ComponentFixture<ComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
