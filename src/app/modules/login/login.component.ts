import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../providers/api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form_usuario = this.fb.group({
    username: ['admin', Validators.required],
    password: ['AbcD1234!', Validators.required] // Deben tener el mismo nombre que tienen en la base de datos
  })

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.form_usuario.value)
      .subscribe(  {
        next: (data: any) => {
          if (data != undefined) {
            this.api.usuario = data
            this.api.crear_header_token(data.token)
            this.router.navigate(['/inicio'])
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error login", error)
            this.messageService.add({
              severity: 'error',
              summary: 'Login error: '+ error.message,
            })
            this.form_usuario.reset();
        }
      })
  }
}
