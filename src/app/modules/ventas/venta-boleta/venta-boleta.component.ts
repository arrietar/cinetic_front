import { Component, OnInit } from '@angular/core';

import {ApiService} from "../../../providers/api.service";


@Component({
    selector: 'app-venta-boleta',
  templateUrl: './venta-boleta.component.html',
  styleUrls: ['./venta-boleta.component.css'],
})
export class VentaBoletaComponent implements OnInit {


  constructor(public api:ApiService) { }

  ngOnInit(){

  }





}
