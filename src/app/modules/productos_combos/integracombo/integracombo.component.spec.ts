import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracomboComponent } from './integracombo.component';

describe('IntegracomboComponent', () => {
  let component: IntegracomboComponent;
  let fixture: ComponentFixture<IntegracomboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracomboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegracomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
