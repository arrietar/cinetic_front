import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  combos: any = [];

  form_combo = this.fb.group({
    id: [''],
    codigo_combo: ['', Validators.required],
    nombre_combo: ['', Validators.required],
    descuento: ['', Validators.required],
  })

  ver_formulario: boolean = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_combo()
  }

  listar_combo() {
    this.api.get('combo')
        .subscribe(data=>{
          if (data != undefined) {
            this.combos = data
          }
        })
  }

  llenar_form(combo: any) {
    this.form_combo.patchValue({
      id: combo.id,
      codigo_combo: combo.codigo_combo,
      nombre_combo: combo.nombre_combo,
      descuento: combo.descuento
    })
  }

  guardar_actualizar_combo() {
    if (this.form_combo.value['id']) {
      this.actualizar_combo()
    } else {
      this.guardar_combo()
      console.log('Creando un nuevo combo')
    }
  }

  guardar_combo() {
    this.api.add('combo', this.form_combo.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_combo.reset()
            this.listar_combo()
          }
        })
  }

  actualizar_combo() {
    this.api.update('combo', this.form_combo.value['id'], this.form_combo.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_combo.reset()
            this.listar_combo()
          }
        })
  }
}
