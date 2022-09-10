import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ErrorComponent } from './modules/error/error.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { EmpleadoComponent } from './modules/empleado/empleado.component';
import { ProductoComponent } from './modules/productos_combos/producto/producto.component';
import { ComboComponent } from './modules/productos_combos/combo/combo.component';
import { CinemaComponent } from './modules/cinema_funciones/cinema/cinema.component';
import { SalaComponent } from './modules/cinema_funciones/sala/sala.component';
import { PeliculaComponent } from './modules/cinema_funciones/pelicula/pelicula.component';
import { FuncionComponent } from './modules/cinema_funciones/funcion/funcion.component';
import { VentaProductoComponent } from './modules/ventas/venta-producto/venta-producto.component';
import { VentaBoletaComponent } from './modules/ventas/venta-boleta/venta-boleta.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApiService} from "./providers/api.service";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    InicioComponent,
    EmpleadoComponent,
    ProductoComponent,
    ComboComponent,
    CinemaComponent,
    SalaComponent,
    PeliculaComponent,
    FuncionComponent,
    VentaProductoComponent,
    VentaBoletaComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        InputTextModule,
        ButtonModule,
        TableModule
    ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
