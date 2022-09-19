import { Component, OnInit } from '@angular/core';
import {CrudService} from "../../../providers/crud.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(public crud: CrudService) { }

  ngOnInit(): void {
    this.crud.listar_producto()
  }
}
