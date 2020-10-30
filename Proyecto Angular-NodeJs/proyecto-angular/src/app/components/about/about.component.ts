import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
public title:string;
public subtitle:string;
public email:string;
  constructor() { 
    this.title = 'Juan Diego Ch'
    this.subtitle = 'Proyecto de Desarrollo Web'
    this.email = 'juanvesro36@hotmail.com'
  }

  ngOnInit(): void {
  }

}
