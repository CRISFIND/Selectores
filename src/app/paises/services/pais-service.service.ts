import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
// import {  } from 'rxjs/operators';
import { Codigo } from '../interfaces/codigo';
import { Paises } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisServiceService {

  private baseUrl : string= 'https://restcountries.com/v2'
  private _regiones = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; // no se altera

  get regiones() : string[]{
    return [...this._regiones];
  }
  constructor(private http:HttpClient) { }
  
  region(region:string): Observable<Paises[]>{
    const url : string = `${this.baseUrl}/region/${region}?fields=alpha3Code,name`;
    return this.http.get<Paises[]>(url);
  }

  codigo(codigo:string): Observable<Codigo | null>{

    if(!codigo){
      return of(null)
    }

    const url = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<Codigo>(url);
  }
}
