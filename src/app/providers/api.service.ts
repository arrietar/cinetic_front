import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

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

  constructor(private http:HttpClient) { }

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
