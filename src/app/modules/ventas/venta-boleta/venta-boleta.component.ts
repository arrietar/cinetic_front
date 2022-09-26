import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../providers/api.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
    selector: 'app-venta-boleta',
  templateUrl: './venta-boleta.component.html',
  styleUrls: ['./venta-boleta.component.css'],
})
export class VentaBoletaComponent implements OnInit {

    funciones: any[] = [];
    funcion_pelicula: any[] = [];

  ver_formulario: boolean = false;
  constructor(public api:ApiService) { }

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




}
