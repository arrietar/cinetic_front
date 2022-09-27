import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../providers/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
    selector: 'app-venta-boleta',
  templateUrl: './venta-boleta.component.html',
  styleUrls: ['./venta-boleta.component.css'],
})
export class VentaBoletaComponent implements OnInit {

    funciones: any[] = [];
    funcion_pelicula: any[] = [];

    salas: any[] =[];
    peliculas: any[] = [];

    form_funcion = this.fb.group({
        id: [''],
        codigo_funcion: ['', Validators.required],
        fecha: ['', Validators.required],
        pelicula: ['', Validators.required],
        sala: ['', Validators.required],
        horario: ['', Validators.required],
        sinopsis: ['', Validators.required],
        caratula: ['', Validators.required],
        boleta: ['', Validators.required],
    })

    value3:any;
  ver_formulario: boolean = false;
    @ViewChild('formFuncion') formFuncion:any;

  constructor(private api:ApiService, private fb:FormBuilder ) { }

  ngOnInit(){

   this.listar_funciones();
   this.listar_funciones_pelicula(0)
  }


    listar_funciones() {

        this.api.get('funcion')
            .subscribe({
                next: (data: any) => {
                    if (data != undefined) {
                        this.funciones =  Array.isArray(data)? data : [data];
                       // this.funciones = data;
                        console.log("los datos de funciones",this.funciones)
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.log("Error listar funciones: ", error.message)
                }
            })
    }
    // Muestra en una Tabla
    listar_funciones_pelicula(pelicula:number) {
        let id = pelicula
        this.api.get('funcion',id)
            .subscribe({
                next: (data: any) => {
                    if (data != undefined) {
                        this.funcion_pelicula =  Array.isArray(data)? data : [data];
                        // this.funciones = data;
                        console.log("los datos de funciones",this.funcion_pelicula)
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.log("Error listar funciones: ", error.message)
                }
            })
    }

    // Muestra los datos en un formulario
    llenar_form(funcion: any) {
        this.form_funcion.patchValue({
            id: funcion.id,
            codigo_funcion: funcion.codigo_funcion,
            fecha: funcion.fecha,
            pelicula: funcion.pelicula.nombre_pelicula,
            sinopsis: funcion.pelicula.sinopsis,
            sala: funcion.sala.nombre_sala,
            horario: funcion.horario,
            caratula: funcion.pelicula.caratula,
        });
    }

    Obtener(){}


}
