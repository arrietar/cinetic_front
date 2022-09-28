import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {ApiService} from "../providers/api.service";
import {ErrorService} from "../providers/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private api: ApiService, private error: ErrorService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const {status, message} = error;
        if (status == 401) {
          this.api.usuario = undefined;
          this.router.navigate(['/login']);
        }

        if (status >= 500) {
          this.error.createError(status, message);
          this.router.navigate(['/error'])
        }

        console.error("Error interceptor: ", error);
        return throwError(() => error);
      })
    )
  }
}
