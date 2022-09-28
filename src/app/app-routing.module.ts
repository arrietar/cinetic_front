import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './modules/error/error.component';
import {LoginComponent} from "./modules/login/login.component";
import {InicioComponent} from "./modules/inicio/inicio.component";
import {EmpleadoComponent} from "./modules/empleado/empleado.component";
import {ProductoComponent} from "./modules/productos_combos/producto/producto.component";
import { ComboComponent } from './modules/productos_combos/combo/combo.component';
import { CinemaComponent } from './modules/cinema_funciones/cinema/cinema.component';
import { SalaComponent } from './modules/cinema_funciones/sala/sala.component';
import {PeliculaComponent} from "./modules/cinema_funciones/pelicula/pelicula.component";
import {FuncionComponent} from "./modules/cinema_funciones/funcion/funcion.component";
import {VentaProductoComponent} from "./modules/ventas/venta-producto/venta-producto.component";
import {VentaBoletaComponent} from "./modules/ventas/venta-boleta/venta-boleta.component";
import { IntegracomboComponent } from './modules/productos_combos/integracombo/integracombo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'combo', component: ComboComponent },
  { path: 'cinema', component: CinemaComponent },
  { path: 'sala', component: SalaComponent },
  { path: 'pelicula', component: PeliculaComponent },
  { path: 'funcion', component: FuncionComponent },
  { path: 'venta_producto', component: VentaProductoComponent },
  { path: 'venta_boleta', component: VentaBoletaComponent },
  { path: 'integracombo', component: IntegracomboComponent },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
