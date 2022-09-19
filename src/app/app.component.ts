import { Component } from '@angular/core';
import {ApiService} from "./providers/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinetic_fnt';

  constructor(public api: ApiService) {
  }
}
