import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../providers/api.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  peliculas: any[] = []

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.get('pelicula').subscribe({
      next: data => {
        console.log(data)
        this.peliculas = data;
      },
      error: error => {
        console.log("Error es: ", error);
      }
    })
  }

}
