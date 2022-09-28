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
    horarios: any[] = [];
    img : any;
    caratula_actual: any;

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


  ver_formulario: boolean = false;
    @ViewChild('formFuncion') formFuncion:any;

  constructor(private api:ApiService, private fb:FormBuilder ) {
      this.horarios = [

      ];
  }

  ngOnInit(){

   this.listar_funciones();
   //this.listar_funciones_pelicula(0)
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


    // Muestra los datos en un formulario
    llenar_form(funcion: any) {
        console.log("Muesta la pelicula ", funcion)

//-----FORMA PARA BUSCAR EL HORARIO-----------
        this.api.get('funcion')
            .subscribe({
                next: (data: any) => {
                    data.forEach((d: any)=>{
                        if(d.pelicula.nombre_pelicula == funcion.pelicula.nombre_pelicula)
                             this.horarios.push({
                                code: d.id,
                                name: d.horario,
                        })
                    })
                    console.log("muestra los hoarios",this.peliculas)
                }
            })

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

        this.caratula_actual = this.form_funcion.get('caratula')?.value;
    }



    Obtener(){}


}
