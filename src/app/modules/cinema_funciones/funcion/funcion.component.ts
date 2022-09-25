import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../providers/api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css'],
  providers: [MessageService]
})
export class FuncionComponent implements OnInit {

  funciones: any;
  salas: any[];
  peliculas: any[];

  form_funcion = this.fb.group({
    id: [''],
    codigo_funcion: ['', Validators.required],
    fecha: ['', Validators.required],
    pelicula_id: ['', Validators.required],
    sala_id: ['', Validators.required],
    horario: ['', Validators.required],
  })

  ver_formulario: boolean = false;

  constructor(
      private router: Router,
      private api: ApiService,
      private fb: FormBuilder,
      private messageService: MessageService
  ) {
    this.salas = [

    ];
    this.peliculas = [

    ]
  }

  ngOnInit(): void {
    this.listar_funciones();
  }

  listar_funciones() {
    this.api.get('funcion')
        .subscribe({
          next: (data: any) => {
            if (data != undefined) {
              this.funciones = data;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log("Error listar funciones: ", error.message)
          }
        })
  }

  llenar_form(funcion: any) {
    this.form_funcion.patchValue({
      id: funcion.id,
      codigo_funcion: funcion.codigo_funcion,
      fecha: funcion.fecha,
      pelicula_id: funcion.pelicula_id,
      sala_id: funcion.sala_id,
      horario: funcion.horario,
    });
  }

}
