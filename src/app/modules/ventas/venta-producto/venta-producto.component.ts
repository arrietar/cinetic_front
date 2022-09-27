import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.component.html',
  styleUrls: ['./venta-producto.component.css']
})
export class VentaProductoComponent implements OnInit {

  ventas: any = [];
  prod_act: any = [];
  valor_venta:Number = 0;
  productosdisponibles: any = [];
  combosdisponibles: any = [];

  ver_formulario: boolean = false;
  ver_formulario1: boolean = false;

  form_producto = this.fb.group({
    id: [''],
    codigo_producto: ['', Validators.required],
    nombre_producto: ['', Validators.required],
    valor_venta: ['', Validators.required],
    inventario: ['', Validators.required],
    cantidad: ['', Validators.required],
  })

  form_combo = this.fb.group({
    id: [''],
    codigo_combo: ['', Validators.required],
    nombre_combo: ['', Validators.required],
    descuento: ['', Validators.required],
    cantidad: ['', Validators.required],
  })

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_productos_dsp()
  }

  listar_productos_dsp() {
    this.api.get('producto')
        .subscribe(data=>{
          if (data != undefined) {
            this.productosdisponibles = data
           }
        })
    this.api.get('combo')
        .subscribe(data=>{
          if (data != undefined) {
            this.combosdisponibles = data
          }
        })
  }

  marcar_prd(producto: any) {
    this.form_producto.patchValue({
      id: producto.id,
      nombre_producto: producto.nombre_producto,
      valor_venta: producto.valor_venta,
      inventario: producto.inventario,
    })
  }

  marcar_cmb(combo: any) {
    this.form_combo.patchValue({
      id: combo.id,
      nombre_combo: combo.nombre_combo,
      descuento: combo.descuento,
    })
  }

  incluir_prd_venta() {
    let item1: any =[];
    let num_A: any = '';
    let num1: number = 0;

    item1.id = this.form_producto.value['id']
    item1.nombre = this.form_producto.value['nombre_producto']
    item1.cantidad = this.form_producto.value['cantidad']
    num_A = this.form_producto.value['valor_venta']
    num1 = parseInt(num_A) * item1.cantidad
    item1.valor_item = num1
    item1.suma_venta += num1
    this.ventas.push(item1)
    this.ver_formulario = false
    this.form_producto.reset()
  }

  incluir_cmb_venta() {
    let item1: any =[];
    let num_A: any = '';
    let num1: number = 0;

    item1.id = this.form_combo.value['id']
    item1.nombre = this.form_combo.value['nombre_combo']
    item1.cantidad = this.form_combo.value['cantidad']
    num_A = this.form_producto.value['valor_venta']
    num1 = parseInt(num_A) * item1.cantidad
    item1.valor_item = num1
    item1.suma_venta += num1
    this.ventas.push(item1)
    this.ver_formulario = false
    this.form_producto.reset()
    console.log(this.ventas)
  }

   actualizar_producto() {
    let cant: number = 0;

    for (const producto of this.ventas ) {
      cant = parseInt(producto.cantidad)
      this.api.get('producto', producto.id)
          .subscribe(data=>{
            if (data != undefined) {
              this.prod_act = data
              console.log(data, this.prod_act)
              this.prod_act['inventario'] -= cant
              console.log(this.prod_act['inventario'], producto.id, this.prod_act)
              this.api.update('producto', producto.id, this.prod_act)
                  .subscribe(data => {
                    if (data != undefined) {
                      alert('Inventario de producto: ' + this.prod_act['nombre_producto'] + ' Actualizado en BD.')
                      this.listar_productos_dsp()
                      this.ventas = []
                    }
                  })
            }
          })

    }
  }

  revisar_compra() {
    this.actualizar_producto()
    //this.ventas = []
    this.ver_formulario = false
    this.ver_formulario1 = false
    //this.form_producto.reset()


  }
}
