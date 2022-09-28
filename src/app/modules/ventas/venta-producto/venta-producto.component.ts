import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.component.html',
  styleUrls: ['./venta-producto.component.css'],
  providers: [MessageService],
})
export class VentaProductoComponent implements OnInit {

  ventas: any = [];
  //ventas_combos = [];
  prod_act: any = [];
  valor_venta:Number = 0;
  productosdisponibles: any = [];
  prod_dsp: any = [];
  combosdisponibles: any = [];
  integracombo: any = [];

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

  constructor(private router: Router,
              private api: ApiService,
              private fb: FormBuilder,
              private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.listar_productos_dsp()
    this.listar_integracombo()
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

  listar_integracombo() {
    this.api.get('integraCombo')
        .subscribe(data=>{
          if (data != undefined) {
            this.integracombo = data
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

    let num_A: any = '';
    let num_B: any = '';
    let num1: number = 0;

    num_A = this.form_producto.value['valor_venta']
    num_B = this.form_producto.value['cantidad']
    num1 = parseInt(num_A) * num_B
    this.ventas.push({
        id: this.form_producto.value['id'],
        nombre: this.form_producto.value['nombre_producto'],
        cantidad: parseInt(num_B),
        valor_item: num1,
        suma_item: parseInt(num_A) * num_B
    })
    this.ver_formulario = false
    this.form_producto.reset()
  }

  incluir_cmb_venta() {
    let num_A: any = '';
    let num1: number = 0;

    for (const item_ic of this.integracombo) {
      if (item_ic.combo.id == this.form_combo.value['id']) {
          num_A = this.form_combo.value['cantidad']
          num1 = parseInt(num_A) * item_ic.cantidad_producto
          this.api.get('producto', item_ic.producto.id)
              .subscribe(data => {
                if (data != undefined) {
                    this.prod_dsp = data
                    if (true) {
                        this.ventas.push({
                            id: item_ic.producto.id,
                            nombre: this.prod_dsp['nombre_producto'],
                            cantidad: num1,
                            valor_item: parseInt(this.prod_dsp['valor_venta']) * num1
                        })
                    }
                  console.log(this.ventas)
                }
              })
      }
    }
    this.ver_formulario1 = false
    this.form_combo.reset()
  }

   actualizar_producto() {

    for (const producto of this.ventas ) {
      this.api.get('producto', producto.id)
          .subscribe(data=>{
            if (data != undefined) {
              this.prod_act = data
              this.prod_act['inventario'] -= parseInt(producto.cantidad)
              console.log(this.prod_act['inventario'], producto.id, this.prod_act)
              this.api.update('producto', producto.id, this.prod_act)
                  .subscribe(data => {
                    if (data != undefined) {
                      this.messageService.add({
                        severity: 'success',
                        summary: `Inventario de producto: ${this.prod_act['nombre_producto']} actualizada en BD`,
                      })
                      this.listar_productos_dsp()
                    }
                  })
            }
          })

    }
  }

  revisar_compra() {
    console.log(this.ventas)
    this.actualizar_producto()
    //this.ventas = []
    this.ver_formulario = false
    this.ver_formulario1 = false
    //this.form_producto.reset()


  }
}
