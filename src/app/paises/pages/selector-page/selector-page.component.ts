import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisServiceService } from '../../services/pais-service.service';
import { Paises } from '../../interfaces/interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region:['',[Validators.required]],
    pais:['',[Validators.required]],
    frontera:['',[Validators.required]]
  })

  regiones : string[] = []; //arreglo de string
  paises : Paises[]= [];
  fronteras : string[] = [];

  constructor( private fb:FormBuilder, private pais:PaisServiceService) { }

  ngOnInit(): void {
    this.regiones = this.pais.regiones;


    //PAISES
    // this.miFormulario.get('region')?.valueChanges.subscribe(  // obtiene los datos 
    //   resp => {
    //     console.log(region);
    //     this.pais.region(region).subscribe(
    //       paises =>{
    //         console.log(paises);
    //         this.paises = paises;
    //       } 
    //     )
    //   })

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');  //reseteo del input
        }),
        switchMap(
          region => this.pais.region(region))        
      )
      .subscribe(paises => {
        this.paises = paises;
      })


      this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap(codigo =>  this.pais.codigo(codigo)))
      .subscribe(
        pais => {
          this.fronteras = pais?.borders || [];
        })
    }
  

  seleccionar(){
    console.log(this.miFormulario.value);
  }

}
