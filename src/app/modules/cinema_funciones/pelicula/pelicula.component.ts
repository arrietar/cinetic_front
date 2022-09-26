import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../providers/api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
  providers: [MessageService]
})
export class PeliculaComponent implements OnInit {

  peliculas: any[] = [];
  generos: any[];
  clasificaciones: any[];
  formDataPelicula: FormData | undefined;

  form_pelicula = this.fb.group({
    id: [''],
    codigo_pelicula: ['', Validators.required,],
    nombre_pelicula: ['', Validators.required,],
    genero: ['', Validators.required,],
    clasificacion: ['', Validators.required],
    fecha_filmacion: ['', Validators.required],
    sinopsis: ['', Validators.required],
    duracion: ['', Validators.required],
    caratula: [''],
  });

  ver_formulario: boolean = false;
  @ViewChild('formPelicula') formPelicula:any;

  constructor(private router: Router,
              private api: ApiService,
              private fb: FormBuilder,
              private messageService: MessageService
  ) {
    this.generos = [
      {code: 'ACC', name: 'Accion'},
      {code: 'AVR', name: 'Aventuras'},
      {code: 'CFN', name: 'Ciencia ficcion'},
      {code: 'COM', name: 'Comedia'},
      {code: 'RMT', name: 'Romantica'},
      {code: 'DRM', name: 'Drama'},
      {code: 'TRR', name: 'Terror'},
      {code: 'SPS', name: 'Suspenso'}
    ];

    this.clasificaciones = [
        {code: 'A', name: 'Infantil'},
        {code: 'AA', name: 'Todo publico'},
        {code: 'B', name: 'Mayores de 12'},
        {code: 'B15', name: 'Mayores de 15'},
        {code: 'C', name: 'Mayores de 18'},
        {code: 'D', name: 'Con contenido explicito'},
    ]
  }

  ngOnInit(): void {
    this.listar_peliculas();
  }

  listar_peliculas() {
    this.api.get('pelicula')
      .subscribe({
        next: (data: any) => {
          if (data != undefined) {
            // Para que funcione la tabla de ngPrime, se requeire de un tipo Array
            // Cuando se hace un Get con un id de especifico, retorna un dato no Array, por eso la validacion
            this.peliculas =  Array.isArray(data)? data : [data];
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error listar peliculas: ", error.message)
        }
      })
  }

  llenar_form(pelicula: any) {
    this.form_pelicula.patchValue({
      id: pelicula.id,
      codigo_pelicula: pelicula.codigo_pelicula,
      nombre_pelicula: pelicula.nombre_pelicula,
      genero: pelicula.genero,
      clasificacion: pelicula.clasificacion,
      fecha_filmacion: pelicula.fecha_filmacion,
      sinopsis: pelicula.sinopsis,
      duracion: pelicula.duracion,
      caratula: '',
    });
  }

  guardar_actualizar_pelicula() {

    this.formDataPelicula = new FormData();
    this.formDataPelicula.append('id', this.form_pelicula.get('id')?.value || '')
    this.formDataPelicula.append('codigo_pelicula', this.form_pelicula.get('codigo_pelicula')?.value || '')
    this.formDataPelicula.append('nombre_pelicula', this.form_pelicula.get('nombre_pelicula')?.value || '')
    this.formDataPelicula.append('genero', this.form_pelicula.get('genero')?.value || '')
    this.formDataPelicula.append('clasificacion', this.form_pelicula.get('clasificacion')?.value || '')
    this.formDataPelicula.append('fecha_filmacion', this.form_pelicula.get('fecha_filmacion')?.value || '')
    this.formDataPelicula.append('sinopsis', this.form_pelicula.get('sinopsis')?.value || '')
    this.formDataPelicula.append('duracion', this.form_pelicula.get('duracion')?.value || '')
    this.formDataPelicula.append('caratula', this.form_pelicula.get('caratula')?.value || '')

    if (this.form_pelicula.value['id']) {
      this.actualizar_pelicula();
    } else {
      this.guardar_pelicula();
    }
  }

  private guardar_pelicula() {

    this.api.add('pelicula', this.formDataPelicula, true)
      .subscribe({
        next: (data) => {
          console.log("Data: ", data);
          if (data != undefined) {
            this.messageService.add({
              severity: 'success',
              summary: `Pelicula ${this.form_pelicula.value.nombre_pelicula} creado correctamente`,
            })
            this.ver_formulario = false;
            this.form_pelicula.reset();
            this.formPelicula.nativeElement.reset();
            this.listar_peliculas();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error al crear Pelicula ${this.form_pelicula.value.nombre_pelicula}: ${error.message}`,
          })
        }
      })
  }

  private actualizar_pelicula() {

    this.api.update('pelicula', this.form_pelicula.value['id'], this.formDataPelicula, true)
      .subscribe({
        next: (data) => {
          if (data != undefined) {
            this.messageService.add({
              severity: 'success',
              summary: `Pelicula ${this.form_pelicula.value.nombre_pelicula} actualizado correctamente`,
            })
            this.ver_formulario = false;
            this.form_pelicula.reset();
            this.formPelicula.nativeElement.reset();
            this.listar_peliculas();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error al actualizar Pelicula  ${this.form_pelicula.value.nombre_pelicula}: ${error.message}`,
          })
        }
      })
  }

  onImageChange(event: any) {
    const imgFile = event.target.files[0];
    this.form_pelicula.get('caratula')?.setValue(imgFile);
    this.form_pelicula.get('caratula')?.updateValueAndValidity();
  }
}
