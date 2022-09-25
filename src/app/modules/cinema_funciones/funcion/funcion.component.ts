import {Component, OnInit, ViewChild} from '@angular/core';
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

  funciones: any[] = [];
  salas: any[] =[];
  peliculas: any[] = [];
  formDataFuncion: FormData | undefined;

  form_funcion = this.fb.group({
    id: [''],
    codigo_funcion: ['', Validators.required],
    fecha: ['', Validators.required],
    pelicula: ['', Validators.required],
    sala: ['', Validators.required],
    horario: ['', Validators.required],
  })

  ver_formulario: boolean = false;
  @ViewChild('formFuncion') formFuncion:any;

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
    this.lista_salas();
    this.lista_peliculas();
  }

  private lista_salas() {
    this.api.get('sala')
        .subscribe({
          next: (data: any) => {
            data.forEach((d: any)=>{
              this.salas.push({
                code: d.id,
                name: d.nombre_sala,
              })
            })
            console.log(this.salas)
          }
        })
  }

  private lista_peliculas() {
    this.api.get('pelicula')
        .subscribe({
          next: (data: any) => {
            data.forEach((d: any)=>{
              this.peliculas.push({
                code: d.id,
                name: d.nombre_pelicula,
              })
            })
            console.log(this.peliculas)
          }
        })
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
      pelicula: funcion.pelicula.nombre_pelicula,
      sala: funcion.sala.nombre_sala,
      horario: funcion.horario,
    });
  }

  guardar_actualizar_funcion() {
    let nueva_funcion = {
      id: this.form_funcion.value['id'],
      codigo_funcion: this.form_funcion.value['codigo_funcion'],
      fecha: this.form_funcion.value['fecha'],
      id_pelicula: this.form_funcion.value['pelicula'],
      id_sala: this.form_funcion.value['sala'],
      horario: this.form_funcion.value['horario'],
    }


    if (this.form_funcion.value['id']) {
      this.actualizar_funcion(nueva_funcion);
    } else {
      this.guardar_funcion(nueva_funcion);
    }
  }

  private guardar_funcion(nueva_funcion: any) {
    console.log(nueva_funcion)

    this.api.add('funcion', nueva_funcion, true)
        .subscribe({
          next: (data) => {
            console.log("Data: ", data);
            if (data != undefined) {
              this.messageService.add({
                severity: 'success',
                summary: `Funcion ${this.form_funcion.value.codigo_funcion} creada correctamente`,
              })
              this.ver_formulario = false;
              this.form_funcion.reset();
              this.formFuncion.nativeElement.reset();
              this.listar_funciones();
            }
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: `Error al crear Funcion ${this.form_funcion.value.codigo_funcion}: ${error.message}`,
            })
          }
        })
  }

  private actualizar_funcion(nueva_funcion: any) {

    this.api.update('funcion', this.form_funcion.value['id'], nueva_funcion)
        .subscribe({
          next: (data) => {
            if (data != undefined) {
              this.messageService.add({
                severity: 'success',
                summary: `Funcion ${this.form_funcion.value.codigo_funcion} actualizada correctamente`,
              })
              this.ver_formulario = false;
              this.form_funcion.reset();
              this.formFuncion.nativeElement.reset();
              this.listar_funciones();
            }
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: `Error al actualizar Funcion  ${this.form_funcion.value.codigo_funcion}: ${error.message}`,
            })
          }
        })
  }

}
