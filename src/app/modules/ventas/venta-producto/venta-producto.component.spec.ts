import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaProductoComponent } from './venta-producto.component';

describe('VentaProductoComponent', () => {
  let component: VentaProductoComponent;
  let fixture: ComponentFixture<VentaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
