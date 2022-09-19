import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usuario: any;
  base_url = 'http://127.0.0.1:8000';
  header_login = new HttpHeaders().set('Content-Type', 'application/json')
  options_login = { headers: this.header_login }
  header_token: any
  options_token: any

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-home',
      command: (event) => {
        this.router.navigate(['/inicio'])
      }
    },
    {
      label: 'Cinema',
      icon: 'fa-solid fa-film',
      items: [
        {
          label: 'Cinema',
          icon: 'fa-solid fa-masks-theater',
          command: (event) => {
            this.router.navigate(['/cinema'])
          }
        },
        {
          label: 'Funcion',
          icon: 'fa-solid fa-clapperboard',
          command: (event) => {
            this.router.navigate(['/funcion'])
          }
        },
        {
          label: 'Pelicula',
          icon: 'fa-solid fa-film',
          command: (event) => {
            this.router.navigate(['/pelicula'])
          }
        },
        {
          label: 'Sala',
          icon: 'fa-solid fa-video',
          command: (event) => {
            this.router.navigate(['/sala'])
          }
        }
      ]
    },
    {
      label: 'Productos',
      icon: 'fa-solid fa-bottle-water',
      items: [
        {
          label: 'Productos',
          icon: 'fa-solid fa-hotdog',
          command: (event) => {
            this.router.navigate(['/producto'])
          }
        },
        {
          label: 'Combos',
          icon: 'fa-solid fa-burger',
          command: (event) => {
            this.router.navigate(['/combo'])
          }
        }
      ]
    },
    {
      label: 'Ventas',
      icon: 'fa-solid fa-hand-holding-dollar',
      items: [
        {
          label: 'Productos',
          icon: 'fa-solid fa-burger',
          command: (event) => {
            this.router.navigate(['/venta_producto'])
          }
        },
        {
          label: 'Boletas',
          icon: 'fa-solid fa-ticket',
          command: (event) => {
            this.router.navigate(['/venta_boleta'])
          }
        }
      ]
    },
    {
      label: 'Administracion',
      icon: 'fa-solid fa-users',
      items: [
        {
          label: 'Empleado',
          icon: 'fa-solid fa-user',
          command: (event) => {
            this.router.navigate(['/empleado'])
          }
        }
      ]
    },
    {
      label: 'Salir',
      icon: 'fa-solid fa-circle-arrow-left'
    }
  ];

  constructor(private http: HttpClient, private router: Router) { }

  login(data:any) {
    let url = `${this.base_url + '/login'}`
    let credenciales = JSON.stringify(data)
    return this.http.post(url, credenciales, this.options_login).pipe(catchError(this.handleError<any>()))
  }

  get(endpoint: string):Observable<any[]> {
    this.crear_header_token();
    let url = `${this.base_url+'/'+endpoint+'/'}`
    return this.http.get(url, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  add(endpoint: string, data: any) {
    let url = `${this.base_url+'/'+endpoint+'/'}`
    let dJason = JSON.stringify(data)
    return this.http.post(url, dJason, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  update(endpoint: string, id: any, data: any) {
    let url = `${this.base_url+'/'+endpoint+'/'+id+'/'}`
    let dJason = JSON.stringify(data)
    return this.http.patch(url, dJason, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  guardar_token(token: string) {
      localStorage.setItem('token_user', token)
  }

  private crear_header_token() {
    const token = localStorage.getItem('token_user') || 'no_token';
    this.header_token = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Token ${token}`);
    this.options_token = { headers: this.header_token };
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.error)
      return of(result as T);
    };
  }

}
