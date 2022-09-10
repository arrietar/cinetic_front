import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBoletaComponent } from './venta-boleta.component';

describe('VentaBoletaComponent', () => {
  let component: VentaBoletaComponent;
  let fixture: ComponentFixture<VentaBoletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaBoletaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
