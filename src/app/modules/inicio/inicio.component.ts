import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../providers/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  peliculas: any;

  cantidad_peliculas: number = 0

  constructor(public api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.api.get('pelicula').subscribe({
      next: (data:any) => {
        this.peliculas = data;
        this.cantidad_peliculas = this.peliculas.length;
      },
      error: error => {
        console.log("Error es: ", error);
      }
    })
  }
//sin usar
  navegarCartelera() {
    this.router.navigate(['/pelicula'])
  }

}
