import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemas: any = [];

  form_cinema = this.fb.group({
    id: [''],
    codigo_cinema: ['', Validators.required],
    ciudad: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', Validators.required],
    nombre_cinema: ['', Validators.required],
  })

  ver_formulario: boolean = false;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listar_cinema()
  }

  listar_cinema(){
    this.api.get('cinema')
        .subscribe(data=>{
          if (data != undefined) {
            this.cinemas = data
          }
        })
  }

  llenar_form(cinema: any) {
    this.form_cinema.patchValue({
      id: cinema.id,
      codigo_cinema: cinema.codigo_cinema,
      ciudad: cinema.ciudad,
      telefono: cinema.telefono,
      direccion: cinema.direccion,
      email: cinema.email,
      nombre_cinema: cinema.nombre_cinema
    })
  }

  guardar_actualizar_cinema() {
    if (this.form_cinema.value['id']) {
      this.actualizar_cinema()
    } else {
      this.guardar_cinema()
    }
  }

  guardar_cinema() {
    this.api.add('cinema', this.form_cinema.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_cinema.reset()
            this.listar_cinema()
          }
        })
  }

  actualizar_cinema() {
    this.api.update('cinema', this.form_cinema.value['id'], this.form_cinema.value)
        .subscribe(data => {
          if (data != undefined) {
            this.ver_formulario = false
            this.form_cinema.reset()
            this.listar_cinema()
          }
        })
  }

}
