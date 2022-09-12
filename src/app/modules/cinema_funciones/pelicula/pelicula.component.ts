import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  peliculas: any[] = []

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.get('pelicula').subscribe(data => {
      if (data != undefined) {
        this.peliculas = data
      } else {
        alert('No se encontraron peliculas')
      }
      console.log(data)
    })
  }
}
