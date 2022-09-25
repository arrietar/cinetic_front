import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {MenuItem} from 'primeng/api';

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

  // de esta forma se declara variable tipo objeto
  pelicula_seleccionado:any;

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-home',
      routerLink: ['/inicio']
    },
    {
      label: 'Cinema',
      icon: 'fa-solid fa-film',
      items: [
        {
          label: 'Cinema',
          icon: 'fa-solid fa-masks-theater',
          routerLink: ['/cinema']
        },
        {
          label: 'Funcion',
          icon: 'fa-solid fa-clapperboard',
          routerLink: ['/funcion']
        },
        {
          label: 'Pelicula',
          icon: 'fa-solid fa-film',
          routerLink: ['/pelicula']
        },
        {
          label: 'Sala',
          icon: 'fa-solid fa-video',
          routerLink: ['/sala']
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
          routerLink: ['/producto']
        },
        {
          label: 'Combos',
          icon: 'fa-solid fa-burger',
          routerLink: ['/combo']
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
          routerLink: ['/venta_producto']
        },
        {
          label: 'Boletas',
          icon: 'fa-solid fa-ticket',
          routerLink: ['/venta_boleta']
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
          routerLink: ['/empleado']
        }
      ]
    },
    {
      label: 'Salir',
      icon: 'fa-solid fa-circle-arrow-left',
      command: () => {
        this.usuario = undefined;
      },
      routerLink: ['/login']
    }
  ];

  constructor(private http: HttpClient) { }

  login(data:any) {
    let url = `${this.base_url + '/login'}`
    let credenciales = JSON.stringify(data)
    return this.http.post(url, credenciales, this.options_login).pipe(catchError(this.handleError));
  }

  get(endpoint: string, id:number=0){
    // this.crear_header_token();
    let url:any;

    if (id > 0) {
      url = `${this.base_url+'/'+endpoint+'/'+id+'/'}`;
    }
    else{
      url = `${this.base_url+'/'+endpoint+'/'}`;
    }

    return this.http.get(url, this.options_token).pipe(catchError(this.handleError));
  }

  add(endpoint: string, data: any, isUploadFile: boolean = false) {
    let url = `${this.base_url+'/'+endpoint+'/'}`

    let formFormat = this.validIsMultipartOrJson(isUploadFile, data)
    return this.http.post(url, formFormat.dataFormat, {headers: formFormat.header_token}).pipe(catchError(this.handleError))
  }

  update(endpoint: string, id: any, data: any, isUploadFile: boolean = false) {
    let url = `${this.base_url+'/'+endpoint+'/'+id+'/'}`


    let formFormat = this.validIsMultipartOrJson(isUploadFile, data)
    return this.http.patch(url, formFormat.dataFormat, {headers: formFormat.header_token}).pipe(catchError(this.handleError))
  }

  crear_header_token(token:any) {
    // const token = localStorage.getItem('token_user') || 'no_token';
    this.header_token = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Token ${token}`);
    this.options_token = { headers: this.header_token };
  }

  // private handleError<T> (result?: T) {
  //   return (error: any): Observable<T> => {
  //     // console.log(error.error)
  //     return of(result as T);
  //   };
  // }

  private validIsMultipartOrJson(isMultipart: boolean = false, data: any){

    let dataFormat;
    let header_token;

    if (isMultipart) {
      header_token = new HttpHeaders().set('Authorization', `Token ${this.usuario.token}`);
      dataFormat = data;
    }else{
      header_token = new HttpHeaders().set('Authorization', `Token ${this.usuario.token}`).set('Content-Type', 'application/json');
      dataFormat = JSON.stringify(data);
    }

    return {
      dataFormat,
      header_token
    };
  }

  private handleError(error: HttpErrorResponse) {
    // if (error.status === 0) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `, error.error);
    // }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }

}
