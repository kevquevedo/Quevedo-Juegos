import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  constructor(
    private firestore: Firestore
  ) { }

  obtenerPalabras(): Observable<[]>{
    const palabras = collection(this.firestore, 'palabrasAhorcado')
    return collectionData(palabras) as Observable<[]>
  }

}
