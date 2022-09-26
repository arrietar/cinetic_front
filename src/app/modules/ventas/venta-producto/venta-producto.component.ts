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

  productosdisponibles: any = [];
  combosdisponibles: any = [];

  ver_formulario: boolean = false;
  ver_formulario1: boolean = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_productos_dsp()
    console.log(this.productosdisponibles)
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

  armar_venta_prds(producto: any) {
    this.form_producto.patchValue({
      id: producto.id,
      nombre_producto: producto.nombre_producto,
      valor_venta: producto.valor_venta,
      inventario: producto.inventario,
    })
  }

  armar_venta_cmb(combo: any) {
    this.form_combo.patchValue({
      id: combo.id,
      nombre_combo: combo.nombre_combo,
      descuento: combo.descuento,
    })
  }

  guardar_venta_prd() {
    let item1: any =[];
    let num_A: any = '';
    let num1: number = 0;

    item1.id = this.form_producto.value['id']
    item1.nombre = this.form_producto.value['nombre_producto']
    item1.cantidad = this.form_producto.value['cantidad']
    num_A = this.form_producto.value['valor_venta']
    num1 = parseInt(num_A) * item1.cantidad
    item1.valor_total = num1
    this.ventas.push(item1)
    this.ver_formulario = false
    this.form_producto.reset()
    console.log(this.ventas)


    /*his.form_producto.get()
    item1.push(producto.id, producto.nombre_producto, '', '') */

    if (this.form_producto.value['id']) {
      this.actualizar_producto()
    }
  }

  guardar_venta_cmb() {
    let item1: any =[];
    let num_A: any = '';
    let num1: number = 0;

    item1.id = this.form_combo.value['id']
    item1.nombre = this.form_combo.value['nombre_combo']
    item1.cantidad = this.form_combo.value['cantidad']
    num_A = this.form_producto.value['valor_venta']
    num1 = parseInt(num_A) * item1.cantidad
    item1.valor_total = num1
    this.ventas.push(item1)
    this.ver_formulario = false
    this.form_producto.reset()
    console.log(this.ventas)


    /*his.form_producto.get()
    item1.push(producto.id, producto.nombre_producto, '', '') */

    if (this.form_producto.value['id']) {
      this.actualizar_producto()
    }
  }

   actualizar_producto() {
    this.api.update('producto', this.form_producto.value['id'], this.form_producto.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.ver_formulario1 = false
            this.form_producto.reset()
            this.listar_productos_dsp()
          }
        })
  }

  revisar_compra() {

  }
}
