import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../providers/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [MessageService]
})
export class EmpleadoComponent implements OnInit {

  empleados: any;

  form_empleado = this.fb.group({
    id: [''],
    token: [''],
    email: ['', Validators.required,],
    identificacion: ['', Validators.required,],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [''],
    fecha_nacimiento: ['', Validators.required,],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ver_formulario: boolean = false;

  constructor(private router: Router,
              private api: ApiService,
              private fb: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.listar_empleados();
  }

  listar_empleados() {
    this.api.get('empleado')
      .subscribe({
        next: (data: any) => {
          console.log("Empleados list: ", data)
          if (data != undefined) {
            this.empleados = data.slice(1, data.byteLength);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error listar empleados: ", error.message)
        }
      })
  }

  llenar_form(empleado: any) {
    this.form_empleado.patchValue({
      id: empleado.id,
      token: empleado.token,
      email: empleado.email,
      identificacion: empleado.identificacion,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      direccion: empleado.direccion,
      telefono: empleado.telefono,
      fecha_nacimiento: empleado.fecha_nacimiento,
      username: empleado.username,
      password: empleado.password,
    });
  }

  guardar_actualizar_empleado() {
    if (this.form_empleado.value['id']) {
      this.actualizar_empleado();
    } else {
      this.guardar_empleado();
    }
  }

  private guardar_empleado() {
    console.log("Dato: ", this.form_empleado.value)
    this.api.add('empleado', this.form_empleado.value)
      .subscribe({
        next: (data) => {
          if (data != undefined) {
            this.messageService.add({
              severity: 'success',
              summary: `Empleado ${this.form_empleado.value.nombres} ${this.form_empleado.value.apellidos}  creado correctamente`,
            })
            this.ver_formulario = false;
            this.form_empleado.reset();
            this.listar_empleados();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error al crear Empleado ${this.form_empleado.value.nombres} ${this.form_empleado.value.apellidos}: ${error.message}`,
          })
        }
      })
  }

  private actualizar_empleado() {
    this.api.update('empleado', this.form_empleado.value['id'], this.form_empleado.value)
      .subscribe({
        next: (data) => {
          if (data != undefined) {
            this.messageService.add({
              severity: 'success',
              summary: `Empleado ${this.form_empleado.value.nombres} ${this.form_empleado.value.apellidos} actualizado correctamente`,
            })
            this.ver_formulario = false;
            this.form_empleado.reset();
            this.listar_empleados();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error al actualizar Empleado  ${this.form_empleado.value.nombres} ${this.form_empleado.value.apellidos}: ${error.message}`,
          })
        }
      })
  }
}
