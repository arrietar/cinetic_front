import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  datos: any = [];

  form_producto = this.fb.group({
    id: [''],
    codigo_producto: ['', Validators.required],
    nombre_producto: ['', Validators.required],
    valor_compra: ['', Validators.required],
    valor_venta: ['', Validators.required],
    ciudad: ['', Validators.required],
    inventario: ['', Validators.required],
  })

  ver_formulario: boolean = false;
  
  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_producto()
  }

  listar_producto() {
    this.api.get('producto')
        .subscribe(data=>{
          if (data != undefined) {
            this.datos = data
          }
        })
  }

  llenar_form(producto: any) {
    this.form_producto.patchValue({
      id: producto.id,
      codigo_producto: producto.codigo_producto,
      nombre_producto: producto.nombre_producto,
      valor_compra: producto.valor_compra,
      valor_venta: producto.valor_venta,
      ciudad: producto.ciudad,
      inventario: producto.inventario
    })
  }

  guardar_actualizar_producto() {
    if (this.form_producto.value['id']) {
      this.actualizar_producto()
    } else {
      this.guardar_producto()
    }
  }

  guardar_producto() {
    this.api.add('producto', this.form_producto.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_producto.reset()
            this.listar_producto()
          }
        })
  }

  actualizar_producto() {
    this.api.update('producto', this.form_producto.value['id'], this.form_producto.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_producto.reset()
            this.listar_producto()
          }
        })
  }
}
