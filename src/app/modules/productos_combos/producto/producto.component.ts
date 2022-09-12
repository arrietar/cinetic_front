import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../providers/api.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: any[] = []

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.get('producto').subscribe(data => {
      if (data != undefined) {
        this.productos = data
      } else {
        alert('No se encontraron productos')
      }
      console.log(data)
    })
  }
}
