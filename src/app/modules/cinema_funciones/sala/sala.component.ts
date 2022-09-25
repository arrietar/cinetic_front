import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  salas: any = [];

  form_sala = this.fb.group({
    id: [''],
    codigo_sala: ['', Validators.required],
    nombre_sala: ['', Validators.required],
    tipo_sala: ['', Validators.required],
    capacidad: ['', Validators.required],
  })

  ver_formulario: boolean = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_sala()
  }

  listar_sala() {
    this.api.get('sala')
        .subscribe(data=>{
          if (data != undefined) {
            this.salas = data
          }
        })
  }

  llenar_form(sala: any) {
    this.form_sala.patchValue({
      id: sala.id,
      codigo_sala: sala.codigo_sala,
      nombre_sala: sala.nombre_sala,
      tipo_sala: sala.tipo_sala,
      capacidad: sala.capacidad,
    })
  }

  guardar_actualizar_sala() {
    if (this.form_sala.value['id']) {
      this.actualizar_sala()
    } else {
      this.guardar_sala()
    }
  }

  guardar_sala() {
    this.api.add('sala', this.form_sala.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_sala.reset()
            this.listar_sala()
          }
        })
  }

  actualizar_sala() {
    this.api.update('sala', this.form_sala.value['id'], this.form_sala.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_sala.reset()
            this.listar_sala()
          }
        })
  }
}
