import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionComponent } from './funcion.component';

describe('FuncionComponent', () => {
  let component: FuncionComponent;
  let fixture: ComponentFixture<FuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
